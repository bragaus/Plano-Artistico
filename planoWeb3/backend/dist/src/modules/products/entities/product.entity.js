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
exports.Product = exports.CryptoCurrency = exports.ProductCategory = exports.ProductType = void 0;
const typeorm_1 = require("typeorm");
var ProductType;
(function (ProductType) {
    ProductType["PHYSICAL"] = "PHYSICAL";
    ProductType["DIGITAL"] = "DIGITAL";
})(ProductType || (exports.ProductType = ProductType = {}));
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["CLOTHING"] = "CLOTHING";
    ProductCategory["BEAT"] = "BEAT";
    ProductCategory["MUSIC"] = "MUSIC";
    ProductCategory["ART"] = "ART";
})(ProductCategory || (exports.ProductCategory = ProductCategory = {}));
var CryptoCurrency;
(function (CryptoCurrency) {
    CryptoCurrency["BTC"] = "BTC";
    CryptoCurrency["ETH"] = "ETH";
    CryptoCurrency["IOTA"] = "IOTA";
})(CryptoCurrency || (exports.CryptoCurrency = CryptoCurrency = {}));
let Product = class Product {
    id;
    title;
    description;
    type;
    category;
    priceAmount;
    priceCurrency;
    stock;
    isActive;
    createdAt;
    updatedAt;
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 160 }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ProductType }),
    __metadata("design:type", String)
], Product.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ProductCategory }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", String)
], Product.prototype, "priceAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CryptoCurrency }),
    __metadata("design:type", String)
], Product.prototype, "priceCurrency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=product.entity.js.map