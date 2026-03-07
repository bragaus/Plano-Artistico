import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(user.id, dto);
  }

  @Get('me')
  findMy(@CurrentUser() user: any) {
    return this.ordersService.findMyOrders(user.id);
  }

  @Get('me/:id')
  findOneMy(@CurrentUser() user: any, @Param('id') id: string) {
    return this.ordersService.findOneMyOrder(user.id, id);
  }
}
