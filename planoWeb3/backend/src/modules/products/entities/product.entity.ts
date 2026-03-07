import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductType {
  PHYSICAL = 'PHYSICAL',
  DIGITAL = 'DIGITAL',
}

export enum ProductCategory {
  CLOTHING = 'CLOTHING',
  BEAT = 'BEAT',
  MUSIC = 'MUSIC',
  ART = 'ART',
}

export enum CryptoCurrency {
  BTC = 'BTC',
  ETH = 'ETH',
  IOTA = 'IOTA',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 160 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  // inteiro (satoshis / wei / iota units). Sem float.
  @Column({ type: 'bigint' })
  priceAmount: string;

  @Column({ type: 'enum', enum: CryptoCurrency })
  priceCurrency: CryptoCurrency;

  // só para PHYSICAL (pode ser null em digitais)
  @Column({ type: 'int', nullable: true })
  stock?: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
