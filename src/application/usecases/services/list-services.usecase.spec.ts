import { Service } from '@domain/entities'
import { InMemoryServicesRepository } from '@tests/repositories'
import { ListServices } from './'

let servicesRepository: InMemoryServicesRepository
let sut: ListServices

describe('List user use case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new ListServices(servicesRepository)
  })
  it('should be able to list users', async () => {
    const service1 = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    const service2 = Service.create({
      name: 'Tosa',
      price: 50
    })

    await servicesRepository.create(service1)
    await servicesRepository.create(service2)

    const services = await sut.execute()

    expect(services).toHaveLength(2)
  })
})
