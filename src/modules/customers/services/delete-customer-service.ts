import { getCustomRepository } from 'typeorm'
import { AppError } from '@shared/errors/app-error'
import { CustomerRepository } from '../infra/typeorm/repositories/customer-repository'

interface IRequest {
  id: number
}

export class DeleteCustomerService {
  public async execute ({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customer = await customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found')
    }
    await customerRepository.remove(customer)
  }
}
