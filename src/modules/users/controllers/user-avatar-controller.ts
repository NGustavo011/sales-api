import { type Request, type Response } from 'express'
import { UpdateUserAvatarService } from '../services/update-user-avatar-service'

export class UserAvatarController {
  public async update (request: Request, response: Response): Promise<Response> {
    const userId = request.user.id
    const avatarFileName = request.file?.filename as string
    const updateUserAvatar = new UpdateUserAvatarService()
    const user = await updateUserAvatar.execute({ userId, avatarFileName })
    return response.json(user)
  }
}
