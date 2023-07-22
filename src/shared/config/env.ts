import dotenv from 'dotenv'

export const loadEnvConfig = (): void => {
  dotenv.config()
}

export default {
  port: process.env.PORT ?? 3333,
  jwtSecret: process.env.JWT_SECRET ?? 'pato'
}
