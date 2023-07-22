import { getCustomRepository } from 'typeorm'
import { type User } from '../typeorm/entities/user'
import { UserRepository } from '../typeorm/repositories/user-repository'
import { AppError } from '@shared/errors/app-error'
import { compare } from 'bcrypt'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
}

export class CreateSessionService {
  public async execute ({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }
    const validPassword = await compare(password, user.password)
    if (!validPassword) {
      throw new AppError('Incorrect email/password combination', 401)
    }
    return { user }
  }
}
