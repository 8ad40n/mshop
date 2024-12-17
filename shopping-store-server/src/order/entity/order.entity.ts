import { User } from 'src/user/entity/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: ['pending', 'confirmed'], default: 'pending' })
  status: 'pending' | 'confirmed';

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('jsonb')
  cart_data: { productId: string; quantity: number; price: number; total: number }[];

  @Column()
  shipping_address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
