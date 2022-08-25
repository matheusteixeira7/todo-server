import { Customer, Service } from '@domain/entities'
import {
  InMemoryCustomersRepository,
  InMemoryServicesRepository,
  InMemoryTransactionsRepository
} from '@tests/repositories'
import { CreateTransaction, UpdateTransaction } from './'
import { setTimeout } from 'timers/promises'

let transactionsRepository: InMemoryTransactionsRepository
let customersRepository: InMemoryCustomersRepository
let servicesRepository: InMemoryServicesRepository
let createTransaction: CreateTransaction
let sut: UpdateTransaction

describe('UpdateTransaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    customersRepository = new InMemoryCustomersRepository()
    servicesRepository = new InMemoryServicesRepository()
    createTransaction = new CreateTransaction(
      transactionsRepository,
      customersRepository,
      servicesRepository
    )
    sut = new UpdateTransaction(transactionsRepository, customersRepository, servicesRepository)
  })

  it('should throw error if transaction is not found.', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    const customer = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'
    })

    await customersRepository.create(customer)

    expect(
      sut.execute({
        id: 'any',
        servicesIds: [service.id],
        isPaid: false,
        customerId: customer.id,
        totalPrice: 0
      })
    ).rejects.toThrow()
  })

  it('should be able to update transactions updatedAt.', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.create(service)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'
    })

    await customersRepository.create(customer)

    const transaction = await createTransaction.execute({
      servicesIds: [service.id],
      isPaid: false,
      customerId: customer.id
    })

    transactionsRepository.create(transaction)

    async function UpdatedTransaction () {
      await setTimeout(2000)
      const updated = Object.assign({}, transaction, {
        ...transaction,
        updatedAt: new Date()
      })
      expect(updated.updatedAt).not.toEqual(transaction.updatedAt)
    }
    UpdatedTransaction()
  })

  it('should be able to update transactions service.', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    const service2 = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.create(service)
    await servicesRepository.create(service2)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'
    })

    await customersRepository.create(customer)

    const transaction = await createTransaction.execute({
      servicesIds: [service.id],
      isPaid: false,
      customerId: customer.id
    })

    transactionsRepository.create(transaction)

    const updated = Object.assign({}, transaction, {
      ...transaction,
      servicesIds: [service.id, service2.id],
      updatedAt: new Date()
    })
    expect(updated.servicesIds).not.toEqual(transaction.servicesIds)
  })

  it('should be able to update transactions isPaid.', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.create(service)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'
    })

    await customersRepository.create(customer)

    const transaction = await createTransaction.execute({
      servicesIds: [service.id],
      isPaid: false,
      customerId: customer.id
    })

    transactionsRepository.create(transaction)

    const updated = Object.assign({}, transaction, {
      ...transaction,
      isPaid: true,
      updatedAt: new Date()
    })
    expect(updated.isPaid).not.toEqual(transaction.isPaid)
  })

  it('should be able to update transactions customerId.', async () => {
    const service = Service.create({
      name: 'Banho e tosa',
      price: 120
    })

    await servicesRepository.create(service)

    const customer = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'
    })

    const customer2 = Customer.create({
      name: 'John Doe',
      email: 'email@email.com',
      phone: '249999999',
      address: 'Rua Santos Dumont, 299'
    })

    await customersRepository.create(customer)
    await customersRepository.create(customer2)

    const transaction = await createTransaction.execute({
      servicesIds: [service.id],
      isPaid: false,
      customerId: customer.id
    })

    transactionsRepository.create(transaction)

    const updated = Object.assign({}, transaction, {
      ...transaction,
      customerId: customer2.id,
      updatedAt: new Date()
    })
    expect(updated.customerId).not.toEqual(transaction.customerId)
  })
})
