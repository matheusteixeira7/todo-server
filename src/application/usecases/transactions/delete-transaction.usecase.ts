import { InvalidParamError } from '@application/errors'
import { TransactionsRepository } from '@application/repositories'
import { injectable, inject } from 'tsyringe'

@injectable()
export class DeleteTransaction {
  constructor (
    @inject('PrismaTransactionRepository')
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute (id: string) {
    const transaction = await this.transactionsRepository.findById(id)

    if (!transaction) {
      throw new InvalidParamError('Transaction not found.')
    }

    await this.transactionsRepository.delete(transaction.id)
  }
}
