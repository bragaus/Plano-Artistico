export declare enum ProductType {
    PHYSICAL = "PHYSICAL",
    DIGITAL = "DIGITAL"
}
export declare enum ProductCategory {
    CLOTHING = "CLOTHING",
    BEAT = "BEAT",
    MUSIC = "MUSIC",
    ART = "ART"
}
export declare enum CryptoCurrency {
    BTC = "BTC",
    ETH = "ETH",
    IOTA = "IOTA"
}
export declare class Product {
    id: string;
    title: string;
    description?: string;
    type: ProductType;
    category: ProductCategory;
    priceAmount: string;
    priceCurrency: CryptoCurrency;
    stock?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
