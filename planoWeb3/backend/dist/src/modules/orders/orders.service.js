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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const product_entity_1 = require("../products/entities/product.entity");
let OrdersService = class OrdersService {
    ordersRepo;
    itemsRepo;
    productsRepo;
    constructor(ordersRepo, itemsRepo, productsRepo) {
        this.ordersRepo = ordersRepo;
        this.itemsRepo = itemsRepo;
        this.productsRepo = productsRepo;
    }
    async create(userId, dto) {
        if (!dto.items?.length) {
            throw new common_1.BadRequestException('Pedido sem itens');
        }
        const productIds = dto.items.map((i) => i.productId);
        const products = await this.productsRepo.find({
            where: { id: (0, typeorm_2.In)(productIds), isActive: true },
        });
        if (products.length !== productIds.length) {
            throw new common_1.NotFoundException('Um ou mais produtos não foram encontrados/ativos');
        }
        for (const p of products) {
            if (p.priceCurrency !== dto.currency) {
                throw new common_1.BadRequestException(`Produto "${p.title}" está em ${p.priceCurrency} mas pedido está em ${dto.currency}`);
            }
        }
        let total = BigInt(0);
        const items = dto.items.map((reqItem) => {
            const product = products.find((p) => p.id === reqItem.productId);
            if (product.type === 'PHYSICAL') {
                const stock = product.stock ?? 0;
                if (stock < reqItem.quantity) {
                    throw new common_1.BadRequestException(`Estoque insuficiente para "${product.title}"`);
                }
            }
            const unit = BigInt(product.priceAmount);
            const qty = BigInt(reqItem.quantity);
            const lineTotal = unit * qty;
            total += lineTotal;
            return this.itemsRepo.create({
                productId: product.id,
                quantity: reqItem.quantity,
                titleSnapshot: product.title,
                currencySnapshot: product.priceCurrency,
                unitPriceSnapshot: product.priceAmount,
                lineTotal: lineTotal.toString(),
            });
        });
        const order = this.ordersRepo.create({
            userId,
            currency: dto.currency,
            totalAmount: total.toString(),
            status: order_entity_1.OrderStatus.PENDING_PAYMENT,
            items,
        });
        const saved = await this.ordersRepo.save(order);
        for (const reqItem of dto.items) {
            const product = products.find((p) => p.id === reqItem.productId);
            if (product.type === 'PHYSICAL') {
                product.stock = (product.stock ?? 0) - reqItem.quantity;
                await this.productsRepo.save(product);
            }
        }
        return saved;
    }
    async findMyOrders(userId) {
        return this.ordersRepo.find({
            where: { userId },
            relations: ['items'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOneMyOrder(userId, orderId) {
        const order = await this.ordersRepo.findOne({
            where: { id: orderId, userId },
            relations: ['items'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Pedido não encontrado');
        }
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map