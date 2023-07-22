import { authConfig } from '@config/auth'
import { AppError } from '@shared/errors/app-error'
import { type NextFunction, type Request, type Response } from 'express'
import { verify } from 'jsonwebtoken'

export function isAuthenticated (request: Request, response: Response, next: NextFunction): void {
  const token = request.headers.authorization
  console.log(token)
  if (!token) {
    throw new AppError('JWT Token is missing')
  }
  try {
    verify(token, authConfig.jwt.secret)
    next()
  } catch (error) {
    throw new AppError('Invalid JWT Token')
  }
}
