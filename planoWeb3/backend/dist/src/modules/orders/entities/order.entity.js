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
exports.Order = exports.OrderStatus = void 0;
const typeorm_1 = require("typeorm");
const order_item_entity_1 = require("./order-item.entity");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING_PAYMENT"] = "PENDING_PAYMENT";
    OrderStatus["PAID"] = "PAID";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["EXPIRED"] = "EXPIRED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
let Order = class Order {
    id;
    userId;
    status;
    totalAmount;
    currency;
    items;
    createdAt;
    updatedAt;
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING_PAYMENT }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", String)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], Order.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItem, (item) => item.order, { cascade: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('orders')
], Order);
//# sourceMappingURL=order.entity.js.map