import { Customer, Pet } from '@domain/entities'
import { InMemoryPetsRepository } from '@tests/repositories'
import { ListPets } from './'

let petsRepository: InMemoryPetsRepository
let sut: ListPets

describe('List pets use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new ListPets(petsRepository)
  })
  it('should be able to list pets', async () => {
    const customer = Customer.create({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St'
    })

    const pet1 = Pet.create({
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
      ownerId: customer.id
    })

    const pet2 = Pet.create({
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
      ownerId: customer.id
    })

    await petsRepository.create(pet1)
    await petsRepository.create(pet2)

    const pets = await sut.execute()

    expect(pets).toHaveLength(2)
  })
})
