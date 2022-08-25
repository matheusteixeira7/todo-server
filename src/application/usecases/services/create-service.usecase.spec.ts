import { Service } from '@domain/entities'
import { InMemoryServicesRepository } from '@tests/repositories'
import { CreateService } from './'

let servicesRepository: InMemoryServicesRepository
let sut: CreateService

describe('Create service use case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new CreateService(servicesRepository)
  })
  it('should throw error if service already exists', async () => {
    const service = Service.create({
      name: 'Banho e Tosa',
      price: 120
    })

    servicesRepository.items.push(service)

    await expect(sut.execute({
      name: 'Banho e Tosa',
      price: 120
    })).rejects.toThrow()
  })

  it('should be able to create a new service', async () => {
    const service = await sut.execute({
      name: 'Banho e Tosa',
      price: 120
    })

    expect(service).toBeInstanceOf(Service)
  })
})
