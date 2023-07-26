import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/product-repository'
import { AppError } from '@shared/errors/app-error'
import redisCache from '@shared/cache/redis-cache'
import env from '@config/env'

interface IRequest {
  id: number
}

export class DeleteProductService {
  public async execute ({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)
    if (!product) {
      throw new AppError('Product not found')
    }
    await productRepository.remove(product)
    await redisCache.invalidate(env.cacheProductList)
  }
}
