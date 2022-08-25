import { Customer } from '@domain/entities/'
import { InMemoryCustomersRepository } from '@tests/repositories'
import { UpdateCustomer } from './'

let customersRepository: InMemoryCustomersRepository
let sut: UpdateCustomer

describe('Update customer use case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new UpdateCustomer(customersRepository)
  })
  it('should throw error if customer not found', async () => {
    await expect(sut.execute({
      id: '1',
      name: 'Matheus Teixeira',
      email: 'teixeira@email.com',
      phone: '5524999999999',
      address: '123 Main St'
    })).rejects.toThrowError('Customer not found.')
  })

  it('should be able to update customer name', async () => {
    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.create(customer)

    Object.assign(customer, {
      ...customer,
      name: 'Matheus Teixeira',
      email: 'teixeira@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const result = await sut.execute({
      id: customer.id,
      name: 'Matheus Teixeira',
      email: 'teixeira@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    expect(result.name).toEqual(customer.name)
  })
})
