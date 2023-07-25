import { customerRouter } from '@modules/customers/routes/customer.routes'
import { orderRouter } from '@modules/orders/routes/order.routes'
import { productRouter } from '@modules/products/routes/product.routes'
import { passwordRouter } from '@modules/users/routes/password.routes'
import { profileRouter } from '@modules/users/routes/profile.routes'
import { sessionRouter } from '@modules/users/routes/session.routes'
import { userRouter } from '@modules/users/routes/user.routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/product', productRouter)
routes.use('/user', userRouter)
routes.use('/profile', profileRouter)
routes.use('/session', sessionRouter)
routes.use('/password', passwordRouter)
routes.use('/customer', customerRouter)
routes.use('/order', orderRouter)
