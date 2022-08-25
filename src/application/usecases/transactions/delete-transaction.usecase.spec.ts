import {
  InMemoryCustomersRepository,
  InMemoryServicesRepository,
  InMemoryTransactionsRepository
} from '@tests/repositories'
import { Customer, Service } from '@domain/entities'
import { CreateTransaction, DeleteTransaction } from './'

let transactionsRepository: InMemoryTransactionsRepository
let customersRepository: InMemoryCustomersRepository
let servicesRepository: InMemoryServicesRepository
let createTransaction: CreateTransaction
let sut: DeleteTransaction

describe('DeleteTransaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    customersRepository = new InMemoryCustomersRepository()
    servicesRepository = new InMemoryServicesRepository()
    createTransaction = new CreateTransaction(
      transactionsRepository,
      customersRepository,
      servicesRepository
    )
    sut = new DeleteTransaction(transactionsRepository)
  })

  it('should throw an error if transaction is not found.', async () => {
    expect(sut.execute('1')).rejects.toThrow()
  })

  it('should delete a transaction.', async () => {
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

    await sut.execute(transaction.id)

    expect(transactionsRepository.items).toHaveLength(0)
  })
})
