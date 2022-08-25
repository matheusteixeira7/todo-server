import { InvalidParamError } from '@application/errors'
import { CustomersRepository } from '@application/repositories'
import { Customer, Pet } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type CustomerProps = {
  name: string
  email: string
  phone: string
  address: string
  pets?: Pet[]
}

@injectable()
export class CreateCustomer {
  constructor (
    @inject('PrismaCustomerRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ name, email, phone, address }: CustomerProps) {
    const customer = await this.customersRepository.findByEmail(email)

    if (customer) {
      throw new InvalidParamError('Customer already exists.')
    }

    const newCustomer = Customer.create({
      name,
      email,
      phone,
      address
    })

    this.customersRepository.create(newCustomer)

    return newCustomer
  }
}
