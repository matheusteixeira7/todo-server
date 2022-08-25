import { Transaction } from '@domain/entities'

export interface TransactionsRepository {
  findById(id: string): Promise<Transaction | null>
  create (customer: Transaction): Promise<Transaction>
  update (customer: Transaction): Promise<Transaction>
  list (): Promise<Transaction[]>
  delete (id: string): Promise<void>
}
