import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { CryptoCurrency, ProductCategory, ProductType } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProductType)
  type: ProductType;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  // bigint como string
  @IsString()
  @IsNotEmpty()
  priceAmount: string;

  @IsEnum(CryptoCurrency)
  priceCurrency: CryptoCurrency;

  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
