import { Customer, Service } from '@domain/entities'
import {
  InMemoryCustomersRepository,
  InMemoryServicesRepository,
  InMemoryTransactionsRepository
} from '@tests/repositories'
import { CreateTransaction } from './'

let transactionsRepository: InMemoryTransactionsRepository
let customersRepository: InMemoryCustomersRepository
let servicesRepository: InMemoryServicesRepository
let sut: CreateTransaction

describe('CreateTransaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    customersRepository = new InMemoryCustomersRepository()
    servicesRepository = new InMemoryServicesRepository()
    sut = new CreateTransaction(
      transactionsRepository,
      customersRepository,
      servicesRepository
    )
  })

  it('should not be able to create a transaction without services', async () => {
    const transaction = sut.execute({
      servicesIds: [],
      isPaid: false,
      customerId: 'any-id'
    })

    expect(transaction).rejects.toThrow()
  })

  it('should not be able to create a transaction if provided customer is not found', async () => {
    const service = Service.create({
      name: 'any',
      price: 120
    })

    const transaction = sut.execute({
      servicesIds: [service.id],
      isPaid: false,
      customerId: 'any-id'
    })

    expect(transaction).rejects.toThrow()
  })

  it('should be able to create a transaction', async () => {
    const service = Service.create({
      name: 'any',
      price: 120
    })

    const service2 = Service.create({
      name: 'any',
      price: 120
    })

    await servicesRepository.create(service)
    await servicesRepository.create(service2)

    const customer = Customer.create({
      name: 'any',
      address: 'any',
      email: 'any',
      phone: 'any'
    })

    await customersRepository.create(customer)

    const transaction = await sut.execute({
      servicesIds: [service.id, service2.id],
      isPaid: false,
      customerId: customer.id
    })

    expect(transaction).toHaveProperty('id')
  })
})
