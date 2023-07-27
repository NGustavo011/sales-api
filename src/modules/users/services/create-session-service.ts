import { getCustomRepository } from 'typeorm'
import { type User } from '../infra/typeorm/entities/user'
import { UserRepository } from '../infra/typeorm/repositories/user-repository'
import { AppError } from '@shared/errors/app-error'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { authConfig } from '@config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
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
    const token = sign({ id: user.id, name: user.name }, authConfig.jwt.secret, { subject: user.id.toString(), expiresIn: authConfig.jwt.expiresIn })
    return { user, token }
  }
}
