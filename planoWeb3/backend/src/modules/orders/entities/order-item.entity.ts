import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  // snapshot do produto no momento da compra
  @Column({ length: 160 })
  titleSnapshot: string;

  @Column({ length: 10 })
  currencySnapshot: string;

  @Column({ type: 'bigint' })
  unitPriceSnapshot: string;

  @Column({ type: 'bigint' })
  lineTotal: string; // unitPriceSnapshot * quantity
}
