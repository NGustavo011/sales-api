import { type Request, type Response } from 'express'
import { ListCustomerService } from '../../../services/list-customer-service'
import { ShowCustomerService } from '../../../services/show-customer-service'
import { CreateCustomerService } from '../../../services/create-customer-service'
import { UpdateCustomerService } from '../../../services/update-customer-service'
import { DeleteCustomerService } from '../../../services/delete-customer-service'

export class CustomerController {
  public async index (request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomerService()
    const customers = await listCustomers.execute()
    return response.json(customers)
  }

  public async show (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showCustomer = new ShowCustomerService()
    const customer = await showCustomer.execute({ id: Number(id) })
    return response.json(customer)
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body
    const createCustomer = new CreateCustomerService()
    const customer = await createCustomer.execute({
      name,
      email
    })
    return response.json(customer)
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email } = request.body
    const updateCustomer = new UpdateCustomerService()
    const customer = await updateCustomer.execute({
      id: Number(id),
      name,
      email
    })
    return response.json(customer)
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteCustomer = new DeleteCustomerService()
    await deleteCustomer.execute({ id: Number(id) })
    return response.status(204).json()
  }
}
