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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) {
        const product = this.repo.create({
            ...dto,
            isActive: dto.isActive ?? true,
        });
        return this.repo.save(product);
    }
    findAll() {
        return this.repo.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const product = await this.repo.findOne({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Produto não encontrado');
        return product;
    }
    async update(id, dto) {
        const product = await this.findOne(id);
        Object.assign(product, dto);
        return this.repo.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        product.isActive = false;
        return this.repo.save(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map