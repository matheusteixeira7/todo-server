import { Service } from '@domain/entities'
import { InMemoryServicesRepository } from '@tests/repositories'
import { GetService } from './'

let servicesRepository: InMemoryServicesRepository
let sut: GetService

describe('Get service use case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new GetService(servicesRepository)
  })
  it('should throw error if service do not exists', async () => {
    await expect(sut.execute({
      id: '1'
    })).rejects.toThrowError('Service not found.')
  })

  it('should be able to get a service', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.create(service)

    const result = await sut.execute({
      id: service.id
    })

    expect(result).toEqual(service)
  })
})
