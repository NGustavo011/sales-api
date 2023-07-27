import { getCustomRepository } from 'typeorm'
import { AppError } from '@shared/errors/app-error'
import { CustomerRepository } from '../infra/typeorm/repositories/customer-repository'
import { type Customer } from '../infra/typeorm/entities/customer'

interface IRequest {
  id: number
}

export class ShowCustomerService {
  public async execute ({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customer = await customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found')
    }
    return customer
  }
}
