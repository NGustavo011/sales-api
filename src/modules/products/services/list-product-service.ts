import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../infra/typeorm/repositories/product-repository'
import { type Product } from '../infra/typeorm/entities/product'
import redisCache from '@shared/cache/redis-cache'
import env from '@config/env'

export class ListProductService {
  public async execute (): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository)
    let products = await redisCache.recover<Product[]>(env.cacheProductList)
    if (!products) {
      products = await productRepository.find()
      await redisCache.save(env.cacheProductList, products)
    }
    return products
  }
}
