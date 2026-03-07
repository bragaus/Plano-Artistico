import { IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  // moeda que o cliente quer pagar (BTC/ETH/IOTA)
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
