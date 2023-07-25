import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { isAuthenticated } from '@shared/http/middlewares/is-authenticated'
import { OrderController } from '../controllers/order-controller'

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
