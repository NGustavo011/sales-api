import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Order } from './order'
import { Product } from '@modules/products/infra/typeorm/entities/product'

@Entity('orders_products')
export class OrdersProducts {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column('decimal')
    price: number

  @Column('int')
    quantity: number

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
    order: Order

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
    product: Product

  @Column()
    order_id: number

  @Column()
    product_id: number

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date
}
