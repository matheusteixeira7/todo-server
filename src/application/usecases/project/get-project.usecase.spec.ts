import {
  InMemoryProjectRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateProjectUseCase, GetProjectUseCase } from '.'
import { CreateUser } from '../users'

let projectRepository: InMemoryProjectRepository
let userRepository: InMemoryUsersRepository

let createUserUseCase: CreateUser
let createProjectUseCase: CreateProjectUseCase

let sut: GetProjectUseCase

describe('GetProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    userRepository = new InMemoryUsersRepository()

    createUserUseCase = new CreateUser(userRepository)
    createProjectUseCase = new CreateProjectUseCase(
      projectRepository,
      userRepository
    )

    sut = new GetProjectUseCase(projectRepository)
  })

  it('should throw if project is not found', async () => {
    await expect(sut.execute({ id: 'invalid_id' })).rejects.toThrowError('Projeto não encontrado')
  })

  it('should be able to return a project', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const project = await createProjectUseCase.execute({
      name: 'project',
      userId: user.id
    })

    const result = await sut.execute({ id: project.id })

    expect(result).toEqual(project)
  })
})
