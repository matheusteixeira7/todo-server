import {
  InMemoryProjectRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateUser } from '../users'
import { CreateProjectUseCase, DeleteProjectUseCase } from './'

let projectRepository: InMemoryProjectRepository
let userRepository: InMemoryUsersRepository

let createUserUseCase: CreateUser
let createProjectUseCase: CreateProjectUseCase

let sut: DeleteProjectUseCase

describe('DeleteProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    userRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUser(userRepository)
    createProjectUseCase = new CreateProjectUseCase(
      projectRepository,
      userRepository
    )
    sut = new DeleteProjectUseCase(projectRepository)
  })

  it('should throw if project is not found', async () => {
    const promise = sut.execute({
      id: 'invalid_id'
    })

    await expect(promise).rejects.toThrow()
  })

  it('should delete project', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const project = await createProjectUseCase.execute({
      name: 'any_name',
      userId: user.id
    })

    await sut.execute({
      id: project.id
    })

    const projectFound = await projectRepository.findById(project.id)

    expect(projectFound).toBeNull()
  })
})
