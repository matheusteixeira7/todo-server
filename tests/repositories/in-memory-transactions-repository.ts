import { TransactionsRepository } from '@application/repositories'
import { Transaction } from '@domain/entities'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async findById (id: string): Promise<Transaction | null> {
    const transaction = this.items.find(t => t.id === id)

    if (!transaction) {
      return null
    }

    return transaction
  }

  async create (transaction: Transaction): Promise<Transaction> {
    const findIndex = this.items.findIndex(t => t.id === transaction.id)

    if (findIndex === -1) {
      this.items.push(transaction)
    }

    return transaction
  }

  async update (transaction: Transaction): Promise<Transaction> {
    const findIndex = this.items.findIndex(t => t.id === transaction.id)

    if (findIndex !== -1) {
      this.items[findIndex] = transaction
    }

    return transaction
  }

  async delete (id: string): Promise<void> {
    const index = this.items.findIndex(t => t.id === id)

    if (index === -1) {
      throw new Error('Transaction not found.')
    }

    this.items.splice(index, 1)
  }

  async list (): Promise<Transaction[]> {
    return this.items
  }
}
