import { InvalidParamError } from '@application/errors'
import { CustomersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type CustomerProps = {
  id: string
}

@injectable()
export class DeleteCustomer {
  constructor (
    @inject('PrismaCustomerRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ id }: CustomerProps) {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new InvalidParamError('Customer not found.')
    }

    this.customersRepository.delete(id)
  }
}
