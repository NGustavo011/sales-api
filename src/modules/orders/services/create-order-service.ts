import { getCustomRepository } from 'typeorm'
import { AppError } from '@shared/errors/app-error'
import { type Order } from '../typeorm/entities/order'
import { OrderRepository } from '../typeorm/repositories/order-repository'
import { CustomerRepository } from '@modules/customers/typeorm/repositories/customer-repository'
import { ProductRepository } from '@modules/products/typeorm/repositories/product-repository'

interface IProduct {
  id: number
  quantity: number
}

interface IRequest {
  customerId: number
  products: IProduct[]
}

export class CreateOrderService {
  public async execute ({ customerId, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository)
    const customerRepository = getCustomRepository(CustomerRepository)
    const productRepository = getCustomRepository(ProductRepository)
    const customerExists = await customerRepository.findById(customerId)
    if (!customerExists) {
      throw new AppError('Could not find any customer with this id')
    }
    const existsProducts = await productRepository.findAllByIds(products)
    if (!existsProducts.length) {
      throw new AppError('Could not find any products with this ids')
    }
    const existsProductsIds = existsProducts.map((product) => product.id)
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    )
    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`)
    }
    const quantityAvailable = products.filter(
      product => existsProducts.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity
    )
    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for product ${quantityAvailable[0].id}`)
    }
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price
    }))
    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    })
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { order_products } = order
    const updatedProductQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }))
    await productRepository.save(updatedProductQuantity)
    return order
  }
}
