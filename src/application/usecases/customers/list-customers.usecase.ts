import { CustomersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListCustomers {
  constructor (
    @inject('PrismaCustomerRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute () {
    return this.customersRepository.list()
  }
}
