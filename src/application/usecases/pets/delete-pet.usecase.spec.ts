import { Customer, Pet } from '@domain/entities'
import { InMemoryCustomersRepository, InMemoryPetsRepository } from '@tests/repositories'
import { DeletePet } from './'

let petsRepository: InMemoryPetsRepository
let customersRepository: InMemoryCustomersRepository
let sut: DeletePet

describe('Delete pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    customersRepository = new InMemoryCustomersRepository()
    sut = new DeletePet(petsRepository)
  })
  it('should throw error if pet not found exists', async () => {
    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Pet not found.')
  })

  it('should be able to delete a pet', async () => {
    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    await customersRepository.create(customer)

    const pet = Pet.create({
      name: 'Apollo',
      specie: 'dog',
      breed: 'labrador',
      ownerId: customer.id
    })

    await petsRepository.create(pet)

    await sut.execute({
      id: pet.id
    })

    expect(petsRepository.items).toHaveLength(0)
  })
})
