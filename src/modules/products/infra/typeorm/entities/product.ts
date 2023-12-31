import { OrdersProducts } from '@modules/orders/infra/typeorm/entities/orders-products'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column()
    name: string

  @Column('decimal')
    price: number

  @Column('int')
    quantity: number

  @OneToMany(() => OrdersProducts, orderProducts => orderProducts.product)
    order_products: OrdersProducts[]

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date
}
