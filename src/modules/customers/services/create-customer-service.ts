import { getCustomRepository } from 'typeorm'
import { AppError } from '@shared/errors/app-error'
import { type Customer } from '../infra/typeorm/entities/customer'
import { CustomerRepository } from '../infra/typeorm/repositories/customer-repository'

interface IRequest {
  name: string
  email: string
}

export class CreateCustomerService {
  public async execute ({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const emailExists = await customerRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already used')
    }
    const customer = customerRepository.create({
      name,
      email
    })
    await customerRepository.save(customer)
    return customer
  }
}
