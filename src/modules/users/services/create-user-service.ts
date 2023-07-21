import { getCustomRepository } from 'typeorm'
import { type User } from '../typeorm/entities/user'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  public async execute ({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    const emailExists = await userRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already used')
    }
    const user = userRepository.create({
      name,
      email,
      password
    })
    await userRepository.save(user)
    return user
  }
}
