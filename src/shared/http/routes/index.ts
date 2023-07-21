import { productRouter } from '@modules/products/routes/product.routes'
import { userRouter } from '@modules/users/routes/user.routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/product', productRouter)
routes.use('/user', userRouter)
