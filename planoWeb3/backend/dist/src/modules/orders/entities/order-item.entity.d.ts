import { Order } from './order.entity';
export declare class OrderItem {
    id: string;
    order: Order;
    productId: string;
    quantity: number;
    titleSnapshot: string;
    currencySnapshot: string;
    unitPriceSnapshot: string;
    lineTotal: string;
}
