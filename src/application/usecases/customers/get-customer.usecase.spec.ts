import { Customer } from '@domain/entities'
import { InMemoryCustomersRepository } from '@tests/repositories'
import { GetCustomer } from './'

let customersRepository: InMemoryCustomersRepository
let sut: GetCustomer

describe('Get customer use case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new GetCustomer(customersRepository)
  })
  it('should throw error if customer do not exists', async () => {
    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Customer not found.')
  })

  it('should be able to get a customer', async () => {
    const customer = Customer.create({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.create(customer)

    const result = await sut.execute({
      id: customer.id
    })

    expect(result).toEqual(customer)
  })
})
