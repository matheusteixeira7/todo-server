import { InvalidParamError } from '@application/errors'
import { CustomersRepository } from '@application/repositories'
import { Customer } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetPetOwner {
  constructor (
    @inject('PrismaCustomerRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute (id: string): Promise<Customer> {
    const owner = await this.customersRepository.findById(id)

    if (!owner) {
      throw new InvalidParamError('Pet owner not found.')
    }

    return owner
  }
}
