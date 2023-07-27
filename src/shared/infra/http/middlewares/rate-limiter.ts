import { type Request, type Response, type NextFunction } from 'express'
import redis from 'redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { AppError } from '@shared/errors/app-error'
import env from '@config/env'

export async function rateLimiter (request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const redisClient = redis.createClient({
      host: env.redisHost,
      port: env.redisPort,
      password: env.redisPass
    })
    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1
    })
    await limiter.consume(request.ip)
    next()
  } catch {
    throw new AppError('Too many requests', 429)
  }
}
