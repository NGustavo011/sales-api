import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/product-repository'
import { type Product } from '../typeorm/entities/product'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  id: number
}

export class ShowProductService {
  public async execute ({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)
    if (!product) {
      throw new AppError('Product not found')
    }
    return product
  }
}
