import { getCustomRepository } from 'typeorm'
import { AppError } from '@shared/errors/app-error'
import { type Customer } from '../typeorm/entities/customer'
import { CustomerRepository } from '../typeorm/repositories/customer-repository'

interface IRequest {
  id: number
  name: string
  email: string
}

export class UpdateCustomerService {
  public async execute ({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customer = await customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found')
    }
    const customerUpdateEmail = await customerRepository.findByEmail(email)
    if (customerUpdateEmail && customerUpdateEmail.id !== Number(id)) {
      throw new AppError('Email already in use')
    }
    customer.name = name
    customer.email = email
    await customerRepository.save(customer)
    return customer
  }
}
