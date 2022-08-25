import { Customer } from '@domain/entities'
import { InMemoryCustomersRepository } from '@tests/repositories'
import { DeleteCustomer } from './'

let customersRepository: InMemoryCustomersRepository
let sut: DeleteCustomer

describe('Delete customer use case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new DeleteCustomer(customersRepository)
  })
  it('should throw error if customer not found', async () => {
    await expect(sut.execute({
      id: '1'
    })).rejects.toThrow()
  })

  it('should be able to delete a customer', async () => {
    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.create(customer)

    await sut.execute({
      id: customer.id
    })

    expect(customersRepository.items).toHaveLength(0)
  })
})
