import { Router } from 'express'
import { ProductController } from '../controllers/product-controller'
import { celebrate, Joi, Segments } from 'celebrate'

export const productRouter = Router()

const productController = new ProductController()
productRouter.get('/', productController.index)
productRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required()
    }
  }),
  productController.show
)
productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  productController.create
)
productRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  productController.update
)
productRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required()
    }
  }),
  productController.delete
)
