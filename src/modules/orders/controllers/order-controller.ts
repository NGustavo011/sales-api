import { type Request, type Response } from 'express'
import { ShowOrderService } from '../services/show-order-service'
import { CreateOrderService } from '../services/create-order-service'

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
