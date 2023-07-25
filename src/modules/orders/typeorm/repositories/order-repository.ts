import { EntityRepository, Repository } from 'typeorm'
import { Order } from '../entities/order'
import { type Customer } from '@modules/customers/typeorm/entities/customer'

interface IProduct {
  product_id: number
  price: number
  quantity: number
}

interface ICreateOrderInput {
  customer: Customer
  products: IProduct[]
}

@EntityRepository(Order)
export class OrderRepository extends Repository <Order> {
  public async findById (id: number): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ['order_products', 'customer']
    })
    return order
  }

  public async createOrder ({ customer, products }: ICreateOrderInput): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products
    })
    await this.save(order)
    return order
  }
}
