import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
