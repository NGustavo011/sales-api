import { getCustomRepository } from 'typeorm'
import { type User } from '../typeorm/entities/user'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { AppError } from '@shared/errors/app-error'
import { compare, hash } from 'bcrypt'

interface IRequest {
  userId: number
  name: string
  email: string
  password?: string
  oldPassword?: string
}

export class UpdateProfileService {
  public async execute ({ userId, name, email, password, oldPassword }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found')
    }
    const userUpdateEmail = await userRepository.findByEmail(email)
    if (userUpdateEmail && userUpdateEmail.id !== Number(userId)) {
      throw new AppError('Email already in use')
    }
    if (password && !oldPassword) {
      throw new AppError('Old password is required')
    }
    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password)
      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }
      user.password = await hash(password, 8)
    }
    user.name = name
    user.email = email
    await userRepository.save(user)
    return user
  }
}
