import { type Request, type Response } from 'express'
import { classToClass } from 'class-transformer'
import { ListUserService } from '@modules/users/services/list-user-service'
import { CreateUserService } from '@modules/users/services/create-user-service'

export class UserController {
  public async index (request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService()
    const users = await listUser.execute()
    return response.json(classToClass(users))
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const createUser = new CreateUserService()
    const user = await createUser.execute({ name, email, password })
    return response.json(classToClass(user))
  }
}
