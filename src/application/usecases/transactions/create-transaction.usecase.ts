import { InvalidParamError } from '@application/errors'
import {
  CustomersRepository,
  ServicesRepository,
  TransactionsRepository
} from '@application/repositories'
import { Transaction } from '@domain/entities'
import { injectable, inject } from 'tsyringe'

type CreateTransactionProps = {
  servicesIds: string[]
  isPaid: boolean
  customerId: string
};

@injectable()
export class CreateTransaction {
  constructor (
    @inject('PrismaTransactionRepository')
    private transactionsRepository: TransactionsRepository,
    @inject('PrismaCustomerRepository')
    private customersRepository: CustomersRepository,
    @inject('PrismaServiceRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({
    servicesIds,
    isPaid,
    customerId
  }: CreateTransactionProps): Promise<Transaction> {
    if (servicesIds.length === 0) {
      throw new Error('No services provided.')
    }

    const services = await this.servicesRepository.findByIds(servicesIds)

    if (services.length !== servicesIds.length) {
      throw new InvalidParamError('One or more services do not exist.')
    }

    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new Error('Customer not found')
    }

    const transaction = Transaction.create({
      customerId,
      isPaid,
      servicesIds,
      totalPrice: services.reduce((acc, service) => acc + service.price, 0)
    })

    await this.transactionsRepository.create(transaction)

    return transaction
  }
}
