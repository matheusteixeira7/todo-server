import { InvalidParamError } from '@application/errors'
import { CustomersRepository, ServicesRepository, TransactionsRepository } from '@application/repositories'
import { Transaction } from '@domain/entities'
import { injectable, inject } from 'tsyringe'

type UpdateTransactionProps = {
  id: string;
  servicesIds: string[];
  isPaid: boolean;
  customerId: string;
  totalPrice: number
};

@injectable()
export class UpdateTransaction {
  constructor (
    @inject('PrismaTransactionRepository')
    private transactionsRepository: TransactionsRepository,
    @inject('PrismaCustomerRepository')
    private customersRepository: CustomersRepository,
    @inject('PrismaServiceRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({
    id,
    servicesIds,
    isPaid,
    customerId,
    totalPrice
  }: UpdateTransactionProps): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(id)

    if (!transaction) {
      throw new InvalidParamError('Transaction is not found.')
    }

    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new InvalidParamError('Customer is not found.')
    }

    const services = await this.servicesRepository.findByIds(servicesIds)

    if (services.length !== servicesIds.length) {
      throw new InvalidParamError('One or more services do not exist.')
    }

    Object.assign(transaction, {
      servicesIds,
      customerId,
      totalPrice,
      isPaid
    })

    this.transactionsRepository.update(transaction)

    return transaction
  }
}
