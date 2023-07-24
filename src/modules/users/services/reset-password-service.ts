import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { UserTokenRepository } from '../typeorm/repositories/user-token-repository'
import { AppError } from '@shared/errors/app-error'
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcrypt'

interface IRequest {
  token: string
  password: string
}

export class ResetPasswordService {
  public async execute ({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const userTokenRepository = getCustomRepository(UserTokenRepository)
    const userToken = await userTokenRepository.findByToken(token)
    if (!userToken) {
      throw new AppError('User token does not exists')
    }
    const user = await userRepository.findById(userToken.user_id)
    if (!user) {
      throw new AppError('User does not exists')
    }
    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }
    user.password = await hash(password, 8)
    await userRepository.save(user)
  }
}
