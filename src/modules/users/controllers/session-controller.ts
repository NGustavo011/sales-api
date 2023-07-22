import { type Request, type Response } from 'express'
import { CreateSessionService } from '../services/create-session-service'

export class SessionController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const createSession = new CreateSessionService()
    const session = await createSession.execute({ email, password })
    return response.json(session)
  }
}
