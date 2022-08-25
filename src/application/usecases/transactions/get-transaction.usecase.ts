import { InvalidParamError } from '@application/errors'
import { TransactionsRepository } from '@application/repositories'
import { Transaction } from '@domain/entities'
import { injectable, inject } from 'tsyringe'

@injectable()
export class GetTransaction {
  constructor (
    @inject('PrismaTransactionRepository')
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute (id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(id)

    if (!transaction) {
      throw new InvalidParamError('Transaction not found.')
    }

    return transaction
  }
}
