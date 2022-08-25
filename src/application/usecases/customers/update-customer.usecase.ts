import { CustomersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type CustomerProps = {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

@injectable()
export class UpdateCustomer {
  constructor (
    @inject('PrismaCustomerRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ id, name, email, phone, address }: CustomerProps) {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new Error('Customer not found.')
    }

    Object.assign(customer, {
      ...customer,
      name,
      email,
      phone,
      address,
      updatedAt: new Date()
    })

    this.customersRepository.update(customer)

    return customer
  }
}
