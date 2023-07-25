import { getCustomRepository } from 'typeorm'
import { type Customer } from '../typeorm/entities/customer'
import { CustomerRepository } from '../typeorm/repositories/customer-repository'

export class ListCustomerService {
  public async execute (): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customers = await customerRepository.find()
    return customers
  }
}
