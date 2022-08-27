import {
  InMemoryProjectRepository,
  InMemoryTaskRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateTaskUseCase, GetTaskUseCase } from '.'
import { CreateProjectUseCase } from '../project'
import { CreateUser } from '../users'

describe('GetTaskUseCase', () => {
  let projectRepository: InMemoryProjectRepository
  let taskRepository: InMemoryTaskRepository
  let userRepository: InMemoryUsersRepository

  let createProjectUseCase: CreateProjectUseCase
  let createTaskUseCase: CreateTaskUseCase
  let createUserUseCase: CreateUser

  let sut: GetTaskUseCase

  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    taskRepository = new InMemoryTaskRepository()
    userRepository = new InMemoryUsersRepository()

    createProjectUseCase = new CreateProjectUseCase(
      projectRepository,
      userRepository
    )
    createTaskUseCase = new CreateTaskUseCase(
      taskRepository,
      projectRepository
    )
    createUserUseCase = new CreateUser(userRepository)

    sut = new GetTaskUseCase(taskRepository)
  })

  it('should throw if task is not found', async () => {
    await expect(sut.execute({ id: 'invalid_id' })).rejects.toThrow()
  })

  it('should be able to return a task', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const project = await createProjectUseCase.execute({
      name: 'project',
      userId: user.id
    })

    const task = await createTaskUseCase.execute({
      name: 'Task 1',
      responsible: 'Responsible 1',
      status: 'Status 1',
      finishDate: new Date(),
      projectId: project.id
    })

    const result = await sut.execute({ id: task.id })

    expect(result).toEqual(task)
  })
})
