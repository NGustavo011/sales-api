import dotenv from 'dotenv'

export const loadEnvConfig = (): void => {
  dotenv.config()
}

export default {
  port: process.env.PORT ?? 3333,
  jwtSecret: process.env.JWT_SECRET ?? 'pato',
  apiUrl: process.env.API_URL ?? 'http://localhost:3333',
  webUrl: process.env.WEB_URL ?? 'http://localhost:3000',
  redisHost: process.env.REDIS_HOST ?? 'localhost',
  redisPort: process.env.REDIS_PORT ?? 6379,
  redisPass: process.env.REDIS_PASS ?? undefined
}
