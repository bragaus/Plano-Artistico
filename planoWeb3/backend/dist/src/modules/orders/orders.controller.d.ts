import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(user: any, dto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    findMy(user: any): Promise<import("./entities/order.entity").Order[]>;
    findOneMy(user: any, id: string): Promise<import("./entities/order.entity").Order>;
}
