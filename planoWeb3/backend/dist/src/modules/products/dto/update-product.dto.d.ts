import { CryptoCurrency, ProductCategory, ProductType } from '../entities/product.entity';
export declare class UpdateProductDto {
    title?: string;
    description?: string;
    type?: ProductType;
    category?: ProductCategory;
    priceAmount?: string;
    priceCurrency?: CryptoCurrency;
    stock?: number;
    isActive?: boolean;
}
