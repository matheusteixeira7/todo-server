import {
  InMemoryProjectRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateProjectUseCase, FilterProjectByUserUseCase } from '../project'
import { CreateUser } from '../users'

describe('FilterProjectByUserUseCase', () => {
  let projectRepository: InMemoryProjectRepository
  let userRepository: InMemoryUsersRepository

  let createProjectUseCase: CreateProjectUseCase
  let createUserUseCase: CreateUser

  let sut: FilterProjectByUserUseCase

  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    userRepository = new InMemoryUsersRepository()

    createProjectUseCase = new CreateProjectUseCase(
      projectRepository,
      userRepository
    )
    createUserUseCase = new CreateUser(userRepository)

    sut = new FilterProjectByUserUseCase(userRepository, projectRepository)
  })

  it('should NOT be able to filter a project with a non-existent user', async () => {
    await expect(sut.execute({ id: 'any_id' })).rejects.toThrowError('User not found')
  })

  it('should be able to filter project by user', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    await createProjectUseCase.execute({
      name: 'any_name',
      userId: user.id
    })

    const projects = await sut.execute({ id: user.id })

    expect(projects).toHaveLength(1)
  })
})
