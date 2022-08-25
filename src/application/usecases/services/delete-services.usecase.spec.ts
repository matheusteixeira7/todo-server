import { Service } from '@domain/entities'
import { InMemoryServicesRepository } from '@tests/repositories'
import { DeleteService } from './'

let servicesRepository: InMemoryServicesRepository
let sut: DeleteService

describe('Delete service use case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new DeleteService(servicesRepository)
  })
  it('should throw error if service not found exists', async () => {
    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Service not found.')
  })

  it('should be able to delete a service', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.create(service)

    await sut.execute({
      id: service.id
    })

    expect(servicesRepository.items).toHaveLength(0)
  })
})
