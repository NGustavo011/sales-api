import { productRouter } from '@modules/products/routes/product.routes'
import { sessionRouter } from '@modules/users/routes/session.routes'
import { userRouter } from '@modules/users/routes/user.routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/product', productRouter)
routes.use('/user', userRouter)
routes.use('/session', sessionRouter)
