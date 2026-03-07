import { OrderItem } from './order-item.entity';
export declare enum OrderStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED"
}
export declare class Order {
    id: string;
    userId: string;
    status: OrderStatus;
    totalAmount: string;
    currency: string;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
