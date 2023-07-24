import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { UserTokenRepository } from '../typeorm/repositories/user-token-repository'
import { AppError } from '@shared/errors/app-error'

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
    const token = await userTokenRepository.generateToken(user.id)
    console.log(token)
  }
}
