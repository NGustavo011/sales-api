import { productsRouter } from '@modules/products/routes/product.routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/product', productsRouter)
