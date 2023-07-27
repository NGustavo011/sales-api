import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../infra/typeorm/repositories/product-repository'
import { AppError } from '@shared/errors/app-error'
import { type Product } from '../infra/typeorm/entities/product'
import redisCache from '@shared/cache/redis-cache'
import env from '@config/env'

interface IRequest {
  id: number
  name: string
  price: number
  quantity: number
}

export class UpdateProductService {
  public async execute ({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)
    if (!product) {
      throw new AppError('Product not found')
    }
    const productWithNameExists = await productRepository.findByName(name)
    if (productWithNameExists && name !== product.name) {
      throw new AppError('There is already one product with this name')
    }
    product.name = name
    product.price = price
    product.quantity = quantity
    await productRepository.save(product)
    await redisCache.invalidate(env.cacheProductList)
    return product
  }
}
