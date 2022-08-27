import {
  InMemoryProjectRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateUser } from '../users'
import { CreateProjectUseCase } from './create-project.usecase'
import { ListProjectUseCase } from './list-project.usecase'

let projectRepository: InMemoryProjectRepository
let userRepository: InMemoryUsersRepository

let createUserUseCase: CreateUser
let createProjectUseCase: CreateProjectUseCase

let sut: ListProjectUseCase

describe('ListProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    userRepository = new InMemoryUsersRepository()

    createUserUseCase = new CreateUser(userRepository)
    createProjectUseCase = new CreateProjectUseCase(
      projectRepository,
      userRepository
    )

    sut = new ListProjectUseCase(projectRepository)
  })

  it('should be able to return all projects', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const project1 = await createProjectUseCase.execute({
      name: 'project1',
      userId: user.id
    })
    const project2 = await createProjectUseCase.execute({
      name: 'project2',
      userId: user.id
    })

    const projects = await sut.execute()

    expect(projects).toHaveLength(2)
    expect(projects).toEqual([project1, project2])
  })
})
