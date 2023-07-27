import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { UserController } from '../controllers/user-controller'
import multer from 'multer'
import { uploadConfig } from '@config/upload'
import { UserAvatarController } from '../controllers/user-avatar-controller'
import { isAuthenticated } from '@shared/infra/http/middlewares/is-authenticated'

export const userRouter = Router()
const userController = new UserController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.multer)

userRouter.get('/', isAuthenticated, userController.index)
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  userController.create
)
userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)
