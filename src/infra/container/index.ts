import { UsersRepository, ProjectRepository, TaskRepository } from '@application/repositories'
import { InMemoryUsersRepository, InMemoryProjectRepository, InMemoryTaskRepository } from '@tests/repositories'
import { PrismaProjectRepository, PrismaTaskRepository, PrismaUserRepository } from '@infra/repos/postgres/prisma/repositories'
import { container } from 'tsyringe'

container.registerSingleton<UsersRepository>('InMemoryUsersRepository', InMemoryUsersRepository)
container.registerSingleton<ProjectRepository>('InMemoryProjectRepository', InMemoryProjectRepository)
container.registerSingleton<TaskRepository>('InMemoryTaskRepository', InMemoryTaskRepository)

container.registerSingleton<UsersRepository>('PrismaUserRepository', PrismaUserRepository)
container.registerSingleton<ProjectRepository>('PrismaProjectRepository', PrismaProjectRepository)
container.registerSingleton<TaskRepository>('PrismaTaskRepository', PrismaTaskRepository)
