import { ResetPasswordService } from '@modules/users/services/reset-password-service'
import { type Request, type Response } from 'express'

export class ResetPasswordController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body
    const resetPassword = new ResetPasswordService()
    await resetPassword.execute({ token, password })
    return response.status(204).json()
  }
}
