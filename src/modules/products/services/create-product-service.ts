import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../infra/typeorm/repositories/product-repository'
import { AppError } from '@shared/errors/app-error'
import { type Product } from '../infra/typeorm/entities/product'
import redisCache from '@shared/cache/redis-cache'
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
    await redisCache.invalidate(env.cacheProductList)
    return product
  }
}
