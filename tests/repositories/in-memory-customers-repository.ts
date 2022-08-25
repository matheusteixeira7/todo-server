import { CustomersRepository } from '@application/repositories'
import { Customer } from '@domain/entities'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async findById (id: string): Promise<Customer | null> {
    const customer = this.items.find(c => c.id === id)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail (email: string): Promise<Customer | null> {
    const customer = this.items.find(customer => customer.email === email)

    if (!customer) {
      return null
    }

    return customer
  }

  async create (customer: Customer): Promise<Customer> {
    const findIndex = this.items.findIndex(c => c.id === customer.id)

    if (findIndex === -1) {
      this.items.push(customer)
    }

    if (findIndex !== -1) {
      this.items[findIndex] = customer
    }

    return customer
  }

  async update (customer: Customer): Promise<Customer> {
    const findIndex = this.items.findIndex(c => c.id === customer.id)

    if (findIndex !== -1) {
      this.items[findIndex] = customer
    }

    return customer
  }

  async delete (id: string): Promise<void> {
    const index = this.items.findIndex(customer => customer.id === id)

    if (index === -1) {
      throw new Error('Customer not found.')
    }

    this.items.splice(index, 1)
  }

  async list (): Promise<Customer[]> {
    return this.items
  }
}
