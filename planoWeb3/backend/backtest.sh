#!/usr/bin/env bash
# plano-api-smoke-test.sh
# Automação simples (smoke test) dos endpoints do backend Plano Artístico
# Requisitos: bash, curl, jq (opcional mas recomendado)
# Uso:
#   chmod +x plano-api-smoke-test.sh
#   ./plano-api-smoke-test.sh
#
# Variáveis opcionais:
#   BASE_URL="http://127.0.0.1:4000" EMAIL="braga@plano.dev" PASS="12345678" NAME="Braga" ./plano-api-smoke-test.sh

set -Eeuo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:4000}"
API_PREFIX="${API_PREFIX:-/api}"
API="${BASE_URL}${API_PREFIX}"

EMAIL="${EMAIL:-braga@plano.dev}"
PASS="${PASS:-12345678}"
NAME="${NAME:-Braga}"

HAS_JQ=0
if command -v jq >/dev/null 2>&1; then
  HAS_JQ=1
fi

green() { printf "\033[0;32m%s\033[0m\n" "$*"; }
red()   { printf "\033[0;31m%s\033[0m\n" "$*"; }
yellow(){ printf "\033[0;33m%s\033[0m\n" "$*"; }

fail() { red "FAIL: $*"; exit 1; }

req() {
  # req METHOD URL [JSON_BODY] [AUTH_TOKEN]
  local method="$1"; shift
  local url="$1"; shift
  local body="${1:-}"; shift || true
  local token="${1:-}"; shift || true

  local headers=(-H "Accept: application/json")
  if [[ -n "$body" ]]; then
    headers+=(-H "Content-Type: application/json")
  fi
  if [[ -n "$token" ]]; then
    headers+=(-H "Authorization: Bearer ${token}")
  fi

  if [[ -n "$body" ]]; then
    curl -sS -X "$method" "${headers[@]}" "$url" -d "$body"
  else
    curl -sS -X "$method" "${headers[@]}" "$url"
  fi
}

expect_json_has() {
  # expect_json_has JSON "field"
  local json="$1"
  local field="$2"
  if [[ "$HAS_JQ" -eq 1 ]]; then
    echo "$json" | jq -e "has(\"$field\")" >/dev/null || fail "Resposta não contém campo '$field'. Resposta: $json"
  else
    echo "$json" | grep -q "\"$field\"" || fail "Resposta não contém campo '$field'. Resposta: $json"
  fi
}

extract_jq() {
  # extract_jq JSON FILTER
  local json="$1"
  local filter="$2"
  if [[ "$HAS_JQ" -eq 1 ]]; then
    echo "$json" | jq -r "$filter"
  else
    # fallback bem simples: não confiável para JSON complexo
    # (ideal: instalar jq)
    echo ""
  fi
}

banner() {
  yellow "============================================================"
  yellow "$1"
  yellow "============================================================"
}

main() {
  banner "Plano Artístico API Smoke Test"
  yellow "BASE_URL: $BASE_URL"
  yellow "API:      $API"
  yellow "EMAIL:    $EMAIL"
  yellow "JQ:       $([[ "$HAS_JQ" -eq 1 ]] && echo "ok" || echo "não (recomendado instalar: sudo apt install jq)")"
  echo

  # 1) Health
  banner "1) Health"
  HEALTH="$(req GET "$API/health")" || fail "Health request falhou"
  echo "$HEALTH"
  expect_json_has "$HEALTH" "status"
  green "OK: /health"
  echo

  # 2) Create user (idempotente-ish: se já existir, pode retornar 409)
  banner "2) Users - Create"
  CREATE_USER_BODY=$(cat <<JSON
{"name":"$NAME","email":"$EMAIL","password":"$PASS"}
JSON
)
  set +e
  CREATE_USER_RES="$(req POST "$API/users" "$CREATE_USER_BODY")"
  CREATE_USER_CODE=$?
  set -e

  if [[ $CREATE_USER_CODE -ne 0 ]]; then
    fail "Falha ao chamar POST /users"
  fi

  # Se já existe, pode vir {"message":"Email já está em uso",...}
  echo "$CREATE_USER_RES"
  if echo "$CREATE_USER_RES" | grep -qi "Email já está em uso"; then
    yellow "WARN: usuário já existia (ok)."
  else
    # quando cria, deve ter id/email/name
    expect_json_has "$CREATE_USER_RES" "id"
    expect_json_has "$CREATE_USER_RES" "email"
    green "OK: POST /users"
  fi
  echo

  # 3) Users list
  banner "3) Users - List"
  USERS_LIST="$(req GET "$API/users")"
  echo "$USERS_LIST" | head -c 800; echo
  green "OK: GET /users"
  echo

  # 4) Auth login
  banner "4) Auth - Login"
  LOGIN_BODY=$(cat <<JSON
{"email":"$EMAIL","password":"$PASS"}
JSON
)
  LOGIN_RES="$(req POST "$API/auth/login" "$LOGIN_BODY")"
  echo "$LOGIN_RES"
  expect_json_has "$LOGIN_RES" "access_token"

  TOKEN=""
  if [[ "$HAS_JQ" -eq 1 ]]; then
    TOKEN="$(extract_jq "$LOGIN_RES" '.access_token')"
  else
    yellow "WARN: jq não encontrado, não consigo extrair token com segurança. Instale jq."
    fail "Instale jq para continuar (sudo apt install jq)."
  fi
  [[ -n "$TOKEN" && "$TOKEN" != "null" ]] || fail "Token vazio no login"
  green "OK: POST /auth/login"
  echo

  # 5) Auth me
  banner "5) Auth - Me"
  ME_RES="$(req GET "$API/auth/me" "" "$TOKEN")"
  echo "$ME_RES"
  expect_json_has "$ME_RES" "id"
  expect_json_has "$ME_RES" "email"
  green "OK: GET /auth/me"
  echo

  # 6) Products - create (protegido)
  banner "6) Products - Create"
  # priceAmount inteiro em string
  PROD_BODY=$(cat <<JSON
{
  "title":"Beat Nebulosa Vol. 1",
  "description":"Beat exclusivo, drop limitado.",
  "type":"DIGITAL",
  "category":"BEAT",
  "priceAmount":"1500000000000000",
  "priceCurrency":"ETH",
  "isActive":true
}
JSON
)
  PROD_RES="$(req POST "$API/products" "$PROD_BODY" "$TOKEN")"
  echo "$PROD_RES"
  expect_json_has "$PROD_RES" "id"
  PRODUCT_ID="$(extract_jq "$PROD_RES" '.id')"
  [[ -n "$PRODUCT_ID" && "$PRODUCT_ID" != "null" ]] || fail "Não consegui extrair productId"
  green "OK: POST /products (id=$PRODUCT_ID)"
  echo

  # 7) Products - list (público)
  banner "7) Products - List"
  PRODS_LIST="$(req GET "$API/products")"
  echo "$PRODS_LIST" | head -c 1000; echo
  green "OK: GET /products"
  echo

  # 8) Products - get one
  banner "8) Products - Get One"
  PROD_ONE="$(req GET "$API/products/$PRODUCT_ID")"
  echo "$PROD_ONE"
  expect_json_has "$PROD_ONE" "id"
  green "OK: GET /products/:id"
  echo

  # 9) Orders - create (protegido)
  banner "9) Orders - Create"
  ORDER_BODY=$(cat <<JSON
{
  "currency":"ETH",
  "items":[{"productId":"$PRODUCT_ID","quantity":1}]
}
JSON
)
  ORDER_RES="$(req POST "$API/orders" "$ORDER_BODY" "$TOKEN")"
  echo "$ORDER_RES"
  expect_json_has "$ORDER_RES" "id"
  ORDER_ID="$(extract_jq "$ORDER_RES" '.id')"
  [[ -n "$ORDER_ID" && "$ORDER_ID" != "null" ]] || fail "Não consegui extrair orderId"
  green "OK: POST /orders (id=$ORDER_ID)"
  echo

  # 10) Orders - list mine
  banner "10) Orders - List Mine"
  MY_ORDERS="$(req GET "$API/orders/me" "" "$TOKEN")"
  echo "$MY_ORDERS" | head -c 1200; echo
  green "OK: GET /orders/me"
  echo

  # 11) Orders - get one mine
  banner "11) Orders - Get One Mine"
  MY_ORDER="$(req GET "$API/orders/me/$ORDER_ID" "" "$TOKEN")"
  echo "$MY_ORDER"
  expect_json_has "$MY_ORDER" "id"
  green "OK: GET /orders/me/:id"
  echo

  banner "RESULTADO FINAL"
  green "✅ Smoke test concluído com sucesso."
  yellow "Criados nesta execução:"
  yellow "  productId: $PRODUCT_ID"
  yellow "  orderId:   $ORDER_ID"
}

main "$@"
