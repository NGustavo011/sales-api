import { getCustomRepository } from 'typeorm'
import { type Customer } from '../typeorm/entities/customer'
import { CustomerRepository } from '../typeorm/repositories/customer-repository'

interface IPaginateCustomer {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  data: Customer[]
}

export class ListCustomerService {
  public async execute (): Promise<IPaginateCustomer> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customers = await customerRepository.createQueryBuilder('').paginate()
    return customers as IPaginateCustomer
  }
}
