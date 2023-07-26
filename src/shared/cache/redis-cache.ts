import Redis, { type Redis as RedisClient } from 'ioredis'
import { cacheConfig } from '@config/cache'

class RedisCache {
  private readonly client: RedisClient
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  private connected = false

  constructor () {
    if (!this.connected) {
      this.client = new Redis(cacheConfig.config.redis)
      this.connected = true
    }
  }

  public async save (key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)
    if (!data) { return null }
    const parsedData = JSON.parse(data) as T
    return parsedData
  }

  public async invalidate (key: string): Promise<void> {
    await this.client.del(key)
  }
}

export default new RedisCache()
