"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
let OrderItem = class OrderItem {
    id;
    order;
    productId;
    quantity;
    titleSnapshot;
    currencySnapshot;
    unitPriceSnapshot;
    lineTotal;
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (order) => order.items, { onDelete: 'CASCADE' }),
    __metadata("design:type", order_entity_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], OrderItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 160 }),
    __metadata("design:type", String)
], OrderItem.prototype, "titleSnapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], OrderItem.prototype, "currencySnapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", String)
], OrderItem.prototype, "unitPriceSnapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", String)
], OrderItem.prototype, "lineTotal", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)('order_items')
], OrderItem);
//# sourceMappingURL=order-item.entity.js.map