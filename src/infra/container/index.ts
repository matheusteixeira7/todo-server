import { CustomersRepository, PetsRepository, ServicesRepository, TransactionsRepository, UsersRepository } from '@application/repositories'
import { InMemoryCustomersRepository, InMemoryPetsRepository, InMemoryServicesRepository, InMemoryTransactionsRepository, InMemoryUsersRepository } from '@tests/repositories'
import { PrismaCustomerRepository, PrismaPetRepository, PrismaServiceRepository, PrismaTransactionRepository, PrismaUserRepository } from '@infra/repos/postgres/prisma/repositories'
import { container } from 'tsyringe'

container.registerSingleton<CustomersRepository>('InMemoryCustomersRepository', InMemoryCustomersRepository)
container.registerSingleton<PetsRepository>('InMemoryPetsRepository', InMemoryPetsRepository)
container.registerSingleton<ServicesRepository>('InMemoryServicesRepository', InMemoryServicesRepository)
container.registerSingleton<TransactionsRepository>('InMemoryTransactionsRepository', InMemoryTransactionsRepository)
container.registerSingleton<UsersRepository>('InMemoryUsersRepository', InMemoryUsersRepository)

container.registerSingleton<CustomersRepository>('PrismaCustomerRepository', PrismaCustomerRepository)
container.registerSingleton<PetsRepository>('PrismaPetRepository', PrismaPetRepository)
container.registerSingleton<ServicesRepository>('PrismaServiceRepository', PrismaServiceRepository)
container.registerSingleton<TransactionsRepository>('PrismaTransactionRepository', PrismaTransactionRepository)
container.registerSingleton<UsersRepository>('PrismaUserRepository', PrismaUserRepository)
