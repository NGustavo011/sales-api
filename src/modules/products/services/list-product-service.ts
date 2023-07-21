import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/product-repository'
import { type Product } from '../typeorm/entities/product'

export class ListProductService {
  public async execute (): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository)
    const products = await productRepository.find()
    return products
  }
}
