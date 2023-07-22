import env from './env'

export const authConfig = {
  jwt: {
    secret: env.jwtSecret,
    expiresIn: '1d'
  }
}
