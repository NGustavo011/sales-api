import { Customer } from '@modules/customers/infra/typeorm/entities/customer'
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { OrdersProducts } from './orders-products'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
    id: number

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
    customer: Customer

  @OneToMany(() => OrdersProducts, orderProducts => orderProducts.order, {
    cascade: true
  })
    order_products: OrdersProducts[]

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date
}
