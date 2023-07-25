import { type Request, type Response } from 'express'
import { ShowProfileService } from '../services/show-profile-service'
import { UpdateProfileService } from '../services/update-profile-service'

export class ProfileController {
  public async index (request: Request, response: Response): Promise<Response> {
    const userId = request.user.id
    const showProfile = new ShowProfileService()
    const user = await showProfile.execute({ userId })
    return response.json(user)
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const userId = request.user.id
    const { name, email, password, oldPassword } = request.body
    const updateProfile = new UpdateProfileService()
    const user = await updateProfile.execute({
      userId,
      email,
      name,
      password,
      oldPassword
    })
    return response.json(user)
  }
}
