import {
  InMemoryProjectRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateUser } from '../users'
import { CreateProjectUseCase } from './'

let projectRepository: InMemoryProjectRepository
let userRepository: InMemoryUsersRepository

let createUserUseCase: CreateUser

let sut: CreateProjectUseCase

describe('CreateProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    userRepository = new InMemoryUsersRepository()

    createUserUseCase = new CreateUser(userRepository)

    sut = new CreateProjectUseCase(projectRepository, userRepository)
  })

  it('should NOT be able to create a project with the same name', async () => {
    expect(async () => {
      await sut.execute({ name: 'project', userId: 'any_id' })
      await sut.execute({ name: 'project', userId: 'any_id' })
    }).rejects.toThrow()
  })

  it('should NOT be able to create a project with a non-existent user', async () => {
    expect(async () => {
      await sut.execute({ name: 'project', userId: 'non-existent-user' })
    }).rejects.toThrow()
  })

  it('should be able to create a project', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const project = await sut.execute({ name: 'project', userId: user.id })

    expect(project).toHaveProperty('id')
  })
})
