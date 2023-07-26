import { AppError } from '@shared/errors/app-error'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { getCustomRepository } from 'typeorm'
import path from 'path'
import { uploadConfig } from '@config/upload'
import fs from 'fs'
import { type User } from '../typeorm/entities/user'

interface IRequest {
  userId: number
  avatarFileName: string
}

export class UpdateUserAvatarService {
  public async execute ({ userId, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne(userId)
    if (!user) {
      throw new AppError('User not found')
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }
    user.avatar = avatarFileName
    await userRepository.save(user)
    return user
  }
}
