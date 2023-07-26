import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/product-repository'
import { AppError } from '@shared/errors/app-error'
import { type Product } from '../typeorm/entities/product'
import { RedisCache } from '@shared/cache/redis-cache'
import env from '@config/env'

interface IRequest {
  name: string
  price: number
  quantity: number
}

export class CreateProductService {
  public async execute ({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const productExists = await productRepository.findByName(name)
    if (productExists) {
      throw new AppError('There is already one product with this name')
    }
    const product = productRepository.create({
      name,
      price,
      quantity
    })
    await productRepository.save(product)
    const redisCache = new RedisCache()
    await redisCache.invalidate(env.cacheProductList)
    return product
  }
}
