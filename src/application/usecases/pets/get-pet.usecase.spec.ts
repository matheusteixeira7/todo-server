import { Customer, Pet } from '@domain/entities'
import { InMemoryCustomersRepository, InMemoryPetsRepository } from '@tests/repositories'
import { GetPet } from './'

let petsRepository: InMemoryPetsRepository
let customersRepository: InMemoryCustomersRepository
let sut: GetPet

describe('Get pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    customersRepository = new InMemoryCustomersRepository()
    sut = new GetPet(petsRepository)
  })
  it('should throw error if pet do not exists', async () => {
    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Pet not found.')
  })

  it('should be able to get a pet', async () => {
    const customer = Customer.create({
      name: 'Diego',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.create(customer)

    const pet = Pet.create({
      name: 'Banho e tosa',
      specie: 'dog',
      breed: 'labrador',
      ownerId: customer.id

    })

    await petsRepository.create(pet)

    const result = await sut.execute({
      id: pet.id
    })

    expect(result).toEqual(pet)
  })
})
