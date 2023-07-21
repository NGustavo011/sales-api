import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { type User } from '../typeorm/entities/user'

export class ListUserService {
  public async execute (): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository)
    const users = await userRepository.find()
    return users
  }
}
