import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // user id do JWT (sub)
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING_PAYMENT })
  status: OrderStatus;

  // total em inteiro (bigint), representado como string
  @Column({ type: 'bigint' })
  totalAmount: string;

  // moeda escolhida para o pagamento do pedido
  @Column({ length: 10 })
  currency: string; // 'BTC' | 'ETH' | 'IOTA' (vamos endurecer depois)

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
