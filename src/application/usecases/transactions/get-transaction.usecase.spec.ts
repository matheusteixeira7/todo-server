import { Service, Customer } from '@domain/entities'
import {
  InMemoryCustomersRepository,
  InMemoryServicesRepository,
  InMemoryTransactionsRepository
} from '@tests/repositories'
import { CreateTransaction, GetTransaction } from './'

let transactionsRepository: InMemoryTransactionsRepository
let customersRepository: InMemoryCustomersRepository
let servicesRepository: InMemoryServicesRepository
let createTransaction: CreateTransaction
let sut: GetTransaction

describe('GetTransaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    customersRepository = new InMemoryCustomersRepository()
    servicesRepository = new InMemoryServicesRepository()
    createTransaction = new CreateTransaction(
      transactionsRepository,
      customersRepository,
      servicesRepository
    )
    sut = new GetTransaction(transactionsRepository)
  })

  it('should throw error if transaction does not exist.', async () => {
    await expect(sut.execute('1')).rejects.toThrow()
  })

  it('should be able to get a transaction.', async () => {
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

    expect(await sut.execute(transaction.id)).toEqual(transaction)
  })
})
