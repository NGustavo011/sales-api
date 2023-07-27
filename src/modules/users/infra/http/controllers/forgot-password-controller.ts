import { SendForgotPasswordEmailService } from '@modules/users/services/send-forgot-password-email-service'
import { type Request, type Response } from 'express'

export class ForgotPasswordController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { email } = request.body
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService()
    await sendForgotPasswordEmail.execute({ email })
    return response.status(204).json()
  }
}
