import {
  InMemoryProjectRepository,
  InMemoryTaskRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateProjectUseCase } from '../project'
import { CreateUser } from '../users'
import { CreateTaskUseCase } from './'

describe('CreateTaskUseCase', () => {
  let projectRepository: InMemoryProjectRepository
  let taskRepository: InMemoryTaskRepository
  let userRepository: InMemoryUsersRepository

  let createProjectUseCase: CreateProjectUseCase
  let createUserUseCase: CreateUser

  let sut: CreateTaskUseCase

  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    taskRepository = new InMemoryTaskRepository()
    userRepository = new InMemoryUsersRepository()

    createProjectUseCase = new CreateProjectUseCase(
      projectRepository,
      userRepository
    )
    createUserUseCase = new CreateUser(userRepository)

    sut = new CreateTaskUseCase(taskRepository, projectRepository)
  })

  it('should NOT be able to create a task with a non-existent project', async () => {
    const task = {
      name: 'task',
      responsible: 'task responsible',
      status: 'pendente',
      finishDate: new Date(),
      projectId: 'invalid_id'
    }

    expect(async () => {
      await sut.execute(task)
    }).rejects.toThrow()
  })

  it('should be able to create a task', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const project = await createProjectUseCase.execute({
      name: 'project',
      userId: user.id
    })

    const task = {
      name: 'task',
      responsible: 'task responsible',
      status: 'pendente',
      finishDate: new Date(),
      projectId: project.id
    }

    const createdTask = await sut.execute(task)

    expect(createdTask).toHaveProperty('id')
  })
})
