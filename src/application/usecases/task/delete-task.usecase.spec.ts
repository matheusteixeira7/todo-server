import {
  InMemoryProjectRepository,
  InMemoryTaskRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateProjectUseCase } from '../project'
import { CreateUser } from '../users'
import { CreateTaskUseCase, DeleteTaskUseCase } from './'

let projectRepository: InMemoryProjectRepository
let taskRepository: InMemoryTaskRepository
let userRepository: InMemoryUsersRepository

let createProjectUseCase: CreateProjectUseCase
let createTaskUseCase: CreateTaskUseCase
let createUserUseCase: CreateUser

let sut: DeleteTaskUseCase

describe('DeleteTaskUseCase', () => {
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

    sut = new DeleteTaskUseCase(taskRepository)
  })

  it('should throw if task is not found', async () => {
    const promise = sut.execute({
      id: 'invalid_id'
    })

    await expect(promise).rejects.toThrow()
  })

  it('should delete task', async () => {
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
      name: 'Task',
      responsible: 'Responsible',
      status: 'Concluída' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: project.id
    })

    await sut.execute({
      id: task.id
    })

    const taskFound = await taskRepository.findById(task.id)

    expect(taskFound).toBeNull()
  })
})
