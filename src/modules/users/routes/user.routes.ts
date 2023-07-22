import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { UserController } from '../controllers/user-controller'
import { isAuthenticated } from '../../../shared/http/middlewares/is-authenticated'
import multer from 'multer'
import { uploadConfig } from '@config/upload'
import { UserAvatarController } from '../controllers/user-avatar-controller'

export const userRouter = Router()
const userController = new UserController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

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
