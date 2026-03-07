import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly itemsRepo: Repository<OrderItem>,
    @InjectRepository(Product) private readonly productsRepo: Repository<Product>,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    if (!dto.items?.length) {
      throw new BadRequestException('Pedido sem itens');
    }

    const productIds = dto.items.map((i) => i.productId);
    const products = await this.productsRepo.find({
      where: { id: In(productIds), isActive: true },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('Um ou mais produtos não foram encontrados/ativos');
    }

    // MVP: todos os produtos do pedido precisam ter a mesma moeda do pedido
    for (const p of products) {
      if (p.priceCurrency !== dto.currency) {
        throw new BadRequestException(
          `Produto "${p.title}" está em ${p.priceCurrency} mas pedido está em ${dto.currency}`,
        );
      }
    }

    let total = BigInt(0);

    const items: OrderItem[] = dto.items.map((reqItem) => {
      const product = products.find((p) => p.id === reqItem.productId)!;

      // valida estoque se PHYSICAL
      if (product.type === 'PHYSICAL') {
        const stock = product.stock ?? 0;
        if (stock < reqItem.quantity) {
          throw new BadRequestException(`Estoque insuficiente para "${product.title}"`);
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
      status: OrderStatus.PENDING_PAYMENT,
      items,
    });

    const saved = await this.ordersRepo.save(order);

    // reserva estoque (para físico)
    for (const reqItem of dto.items) {
      const product = products.find((p) => p.id === reqItem.productId)!;
      if (product.type === 'PHYSICAL') {
        product.stock = (product.stock ?? 0) - reqItem.quantity;
        await this.productsRepo.save(product);
      }
    }

    return saved;
  }

  async findMyOrders(userId: string) {
    return this.ordersRepo.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneMyOrder(userId: string, orderId: string) {
    const order = await this.ordersRepo.findOne({
      where: { id: orderId, userId },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }
}
