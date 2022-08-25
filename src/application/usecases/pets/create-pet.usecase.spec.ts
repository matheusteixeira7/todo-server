import { Customer, Pet } from '@domain/entities'
import { InMemoryCustomersRepository, InMemoryPetsRepository } from '@tests/repositories'
import { CreatePet } from './'

let petsRepository: InMemoryPetsRepository
let customersRepository: InMemoryCustomersRepository
let sut: CreatePet

describe('Create pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    customersRepository = new InMemoryCustomersRepository()
    sut = new CreatePet(petsRepository, customersRepository)
  })
  it('should throw an error if customer does not exist', async () => {
    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await expect(sut.execute({
      name: 'Apollo',
      specie: 'dog',
      breed: 'labrador',
      ownerId: customer.id
    })).rejects.toThrow()
  })

  it('should be able to create a new pet', async () => {
    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.create(customer)

    const pet = await sut.execute({
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
      ownerId: customer.id
    })

    expect(pet).toBeInstanceOf(Pet)
  })
})
