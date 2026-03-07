import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
export declare class OrdersService {
    private readonly ordersRepo;
    private readonly itemsRepo;
    private readonly productsRepo;
    constructor(ordersRepo: Repository<Order>, itemsRepo: Repository<OrderItem>, productsRepo: Repository<Product>);
    create(userId: string, dto: CreateOrderDto): Promise<Order>;
    findMyOrders(userId: string): Promise<Order[]>;
    findOneMyOrder(userId: string, orderId: string): Promise<Order>;
}
