import { authConfig } from '@config/auth'
import { AppError } from '@shared/errors/app-error'
import { type NextFunction, type Request, type Response } from 'express'
import { verify } from 'jsonwebtoken'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export function isAuthenticated (request: Request, response: Response, next: NextFunction): void {
  const token = request.headers.authorization
  if (!token) {
    throw new AppError('JWT Token is missing')
  }
  try {
    const decodedToken = verify(token, authConfig.jwt.secret)
    const { sub } = decodedToken as ITokenPayload
    request.user = {
      id: sub
    }
    next()
  } catch (error) {
    throw new AppError('Invalid JWT Token')
  }
}
