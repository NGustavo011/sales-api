import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/product-repository'
import { type Product } from '../typeorm/entities/product'
import { RedisCache } from '@shared/cache/redis-cache'
import env from '@config/env'

export class ListProductService {
  public async execute (): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository)
    const redisCache = new RedisCache()
    let products = await redisCache.recover<Product[]>(env.cacheProductList)
    if (!products) {
      products = await productRepository.find()
      await redisCache.save(env.cacheProductList, products)
    }
    return products
  }
}
