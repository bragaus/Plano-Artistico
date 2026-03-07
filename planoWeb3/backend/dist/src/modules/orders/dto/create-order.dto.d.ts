declare class CreateOrderItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    currency: string;
    items: CreateOrderItemDto[];
}
export {};
