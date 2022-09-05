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

    sut = new CreateProjectUseCase(
      projectRepository,
      userRepository
    )
  })

  it('should NOT be able to create a project with the same name', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    await sut.execute({
      name: 'any_name',
      userId: user.id
    })

    const promise = sut.execute({
      name: 'any_name',
      userId: user.id
    })

    await expect(promise).rejects.toThrowError('Projeto já existe')
  })

  it('should NOT be able to create a project with a non-existent user', async () => {
    const promise = sut.execute({
      name: 'any_name',
      userId: 'invalid_id'
    })

    await expect(promise).rejects.toThrowError('Usuário não encontrado')
  })

  it('should be able to create a project', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const project = await sut.execute({
      name: 'any_name',
      userId: user.id
    })

    expect(project).toHaveProperty('id')
    expect(project.name).toBe('any_name')
    expect(project.userId).toBe(user.id)
  })
})
