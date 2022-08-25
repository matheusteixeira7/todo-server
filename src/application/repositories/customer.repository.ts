import { Customer } from '@domain/entities'

export interface CustomersRepository {
  findById(id: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  create (customer: Customer): Promise<Customer>
  update (customer: Customer): Promise<Customer>
  delete (id: string): Promise<void>
  list (): Promise<Customer[]>
}
