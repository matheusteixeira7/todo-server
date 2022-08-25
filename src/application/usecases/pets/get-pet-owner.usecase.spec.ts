import { Customer } from '@domain/entities'
import { InMemoryCustomersRepository } from '@tests/repositories'
import { GetPetOwner } from './'

let customersRepository: InMemoryCustomersRepository
let sut: GetPetOwner

describe('Get pet owner use case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new GetPetOwner(customersRepository)
  })

  it('should throw error if pet owner is not found exists', async () => {
    await expect(sut.execute(
      '1'
    )).rejects.toThrow()
  })

  it('should be able to get a pet owner', async () => {
    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@email.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.create(customer)

    const result = await sut.execute(customer.id)

    expect(result).toEqual(customer)
  })
})
