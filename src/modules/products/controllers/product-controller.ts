import { type Request, type Response } from 'express'
import { ListProductService } from '../services/list-product-service'
import { ShowProductService } from '../services/show-product-service'
import { CreateProductService } from '../services/create-product-service'
import { UpdateProductService } from '../services/update-product-service'
import { DeleteProductService } from '../services/delete-product-service'

export class ProductController {
  public async index (request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService()
    const products = await listProducts.execute()
    return response.json(products)
  }

  public async show (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showProduct = new ShowProductService()
    const product = await showProduct.execute({ id: Number(id) })
    return response.json(product)
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const createProduct = new CreateProductService()
    const product = await createProduct.execute({
      name,
      price,
      quantity
    })
    return response.json(product)
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, price, quantity } = request.body
    const updateProduct = new UpdateProductService()
    const product = await updateProduct.execute({
      id: Number(id),
      name,
      price,
      quantity
    })
    return response.json(product)
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteProduct = new DeleteProductService()
    await deleteProduct.execute({ id: Number(id) })
    return response.status(204).json()
  }
}
