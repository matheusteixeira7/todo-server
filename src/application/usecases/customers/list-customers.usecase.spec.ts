import { Customer } from '@domain/entities'
import { InMemoryCustomersRepository } from '@tests/repositories'
import { ListCustomers } from './'

let customersRepository: InMemoryCustomersRepository
let sut: ListCustomers

describe('List customers use case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new ListCustomers(customersRepository)
  })
  it('should be able to list customers', async () => {
    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const customer2 = Customer.create({
      name: 'Matheus Teixeira',
      email: 'teixeira@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.create(customer)
    await customersRepository.create(customer2)

    const customers = await sut.execute()

    expect(customers).toHaveLength(2)
  })
})
