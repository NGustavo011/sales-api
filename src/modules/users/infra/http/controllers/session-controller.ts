import { type Request, type Response } from 'express'
import { classToClass } from 'class-transformer'
import { CreateSessionService } from '@modules/users/services/create-session-service'

export class SessionController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const createSession = new CreateSessionService()
    const session = await createSession.execute({ email, password })
    return response.json(classToClass(session))
  }
}
