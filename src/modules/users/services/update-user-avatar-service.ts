import { AppError } from '@shared/errors/app-error'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { getCustomRepository } from 'typeorm'
import { type User } from '../typeorm/entities/user'
import { DiskStorageProvider } from '@shared/providers/storage-provider/disk-storage-provider'

interface IRequest {
  userId: number
  avatarFileName: string
}

export class UpdateUserAvatarService {
  public async execute ({ userId, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    const storageProvider = new DiskStorageProvider()
    const user = await userRepository.findOne(userId)
    if (!user) {
      throw new AppError('User not found')
    }
    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar)
    }
    const fileName = await storageProvider.saveFile(avatarFileName)
    user.avatar = fileName
    await userRepository.save(user)
    return user
  }
}
