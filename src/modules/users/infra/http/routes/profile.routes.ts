import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { ProfileController } from '../controllers/profile-controller'
import { isAuthenticated } from '@shared/infra/http/middlewares/is-authenticated'

export const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(isAuthenticated)

profileRouter.get(
  '/',
  profileController.show
)
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      oldPassword: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')).when('password', {
        is: Joi.exist(),
        then: Joi.required()
      })
    }
  }),
  profileController.update
)
