import { getCustomRepository } from 'typeorm'
import { AppError } from '@shared/errors/app-error'
import { type Order } from '../typeorm/entities/order'
import { OrderRepository } from '../typeorm/repositories/order-repository'

interface IRequest {
  id: number
}

export class ShowOrderService {
  public async execute ({ id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository)
    const order = await orderRepository.findById(id)
    if (!order) {
      throw new AppError('Order not found')
    }
    return order
  }
}
