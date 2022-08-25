import { TransactionsRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListTransactions {
  constructor (
    @inject('PrismaTransactionRepository')
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute () {
    return this.transactionsRepository.list()
  }
}
