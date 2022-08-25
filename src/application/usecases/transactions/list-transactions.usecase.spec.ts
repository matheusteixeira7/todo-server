import { Service, Customer, Transaction } from '@domain/entities'
import { InMemoryTransactionsRepository } from '@tests/repositories'
import { ListTransactions } from './'

let transactionsRepository: InMemoryTransactionsRepository
let sut: ListTransactions

describe('ListTransactions', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new ListTransactions(transactionsRepository)
  })

  it('should return an list of transactions', async () => {
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

    const transaction = Transaction.create({
      servicesIds: [service.id],
      totalPrice: 120,
      isPaid: false,
      customerId: customer.id
    })

    const transaction2 = Transaction.create({
      servicesIds: [service.id],
      totalPrice: 120,
      isPaid: false,
      customerId: customer.id
    })

    transactionsRepository.create(transaction)
    transactionsRepository.create(transaction2)

    const transactions = await sut.execute()

    expect(transactions).toHaveLength(2)
  })
})
