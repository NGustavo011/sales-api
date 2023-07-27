import { CreateOrderService } from '@modules/orders/services/create-order-service'
import { ShowOrderService } from '@modules/orders/services/show-order-service'
import { type Request, type Response } from 'express'

export class OrderController {
  public async show (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showOrder = new ShowOrderService()
    const order = await showOrder.execute({ id: Number(id) })
    return response.json(order)
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body
    const createOrder = new CreateOrderService()
    const order = await createOrder.execute({
      customerId,
      products
    })
    return response.json(order)
  }
}
