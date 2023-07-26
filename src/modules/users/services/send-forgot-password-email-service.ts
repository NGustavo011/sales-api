import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { UserTokenRepository } from '../typeorm/repositories/user-token-repository'
import { AppError } from '@shared/errors/app-error'
import EtherealMail from '@config/mail/ethereal-mail'
import path from 'path'
import env from '@config/env'
import SESMail from '@config/mail/ses-mail'
import { mailConfig } from '@config/mail/mail'

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
    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          name: user.name,
          email: user.email
        },
        subject: '[SALES-API] Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${env.webUrl}/reset_password?token=${token}`
          }
        }
      })
      return
    }
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
          link: `${env.webUrl}/reset_password?token=${token}`
        }
      }
    })
  }
}
