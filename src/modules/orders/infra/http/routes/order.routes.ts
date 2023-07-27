import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { OrderController } from '../controllers/order-controller'
import { isAuthenticated } from '@shared/infra/http/middlewares/is-authenticated'

export const orderRouter = Router()

const orderController = new OrderController()

orderRouter.use(isAuthenticated)
orderRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required()
    }
  }),
  orderController.show
)
orderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customerId: Joi.number().required(),
      products: Joi.required()
    }
  }),
  orderController.create
)
