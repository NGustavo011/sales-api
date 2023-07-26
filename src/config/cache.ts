import env from './env'
import { type RedisOptions } from 'ioredis'

interface ICacheConfig {
  config: {
    redis: RedisOptions
  }
  driver: string
}

export const cacheConfig: ICacheConfig = {
  config: {
    redis: {
      host: env.redisHost,
      port: Number(env.redisPort),
      password: env.redisPass
    }
  },
  driver: 'redis'
}
