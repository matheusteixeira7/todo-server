import { Customer } from '@domain/entities'
import { InMemoryCustomersRepository } from '@tests/repositories'
import { CreateCustomer } from './'

let customersRepository: InMemoryCustomersRepository
let sut: CreateCustomer

describe('Create customer use case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomer(customersRepository)
  })
  it('should throw error if customer already exists', async () => {
    const customer = Customer.create({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    customersRepository.create(customer)

    await expect(sut.execute({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })).rejects.toThrow()
  })

  it('should be able to create a new user', async () => {
    const customer = await sut.execute({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    expect(customer).toBeInstanceOf(Customer)
  })
})

// describe('Create customer use case', () => {
//   it('should be able to create a new customer', async () => {
//     expect(true).toBe(true)
//   })
// })
