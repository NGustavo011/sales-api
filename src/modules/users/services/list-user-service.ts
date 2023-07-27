import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../infra/typeorm/repositories/user-repository'
import { type User } from '../infra/typeorm/entities/user'

export class ListUserService {
  public async execute (): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository)
    const users = await userRepository.find()
    return users
  }
}
