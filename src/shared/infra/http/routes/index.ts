import { customerRouter } from '@modules/customers/infra/http/routes/customer.routes'
import { orderRouter } from '@modules/orders/infra/http/routes/order.routes'
import { productRouter } from '@modules/products/infra/http/routes/product.routes'
import { passwordRouter } from '@modules/users/infra/http/routes/password.routes'
import { profileRouter } from '@modules/users/infra/http/routes/profile.routes'
import { sessionRouter } from '@modules/users/infra/http/routes/session.routes'
import { userRouter } from '@modules/users/infra/http/routes/user.routes'

import { Router } from 'express'

export const routes = Router()

routes.use('/product', productRouter)
routes.use('/user', userRouter)
routes.use('/profile', profileRouter)
routes.use('/session', sessionRouter)
routes.use('/password', passwordRouter)
routes.use('/customer', customerRouter)
routes.use('/order', orderRouter)
