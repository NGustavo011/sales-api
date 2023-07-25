import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { UserTokenRepository } from '../typeorm/repositories/user-token-repository'
import { AppError } from '@shared/errors/app-error'
import EtherealMail from '@config/mail/ethereal-mail'
import path from 'path'

interface IRequest {
  email: string
}

export class SendForgotPasswordEmailService {
  public async execute ({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const userTokenRepository = getCustomRepository(UserTokenRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists')
    }
    const { token } = await userTokenRepository.generateToken(user.id)
    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot-password.hbs')
    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[SALES-API] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      }
    })
  }
}
