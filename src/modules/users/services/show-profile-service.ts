import { getCustomRepository } from 'typeorm'
import { type User } from '../typeorm/entities/user'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  userId: number
}

export class ShowProfileService {
  public async execute ({ userId }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found')
    }
    return user
  }
}
