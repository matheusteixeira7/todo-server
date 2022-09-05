import {
  InMemoryProjectRepository,
  InMemoryTaskRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateProjectUseCase } from '../project'
import { CreateUser } from '../users'
import { CreateTaskUseCase, FilterTaskUseCase } from './'

describe('FilterTaskUseCase', () => {
  let projectRepository: InMemoryProjectRepository
  let taskRepository: InMemoryTaskRepository
  let userRepository: InMemoryUsersRepository

  let createProjectUseCase: CreateProjectUseCase
  let createTaskUseCase: CreateTaskUseCase
  let createUserUseCase: CreateUser

  let sut: FilterTaskUseCase

  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    taskRepository = new InMemoryTaskRepository()
    userRepository = new InMemoryUsersRepository()

    createProjectUseCase = new CreateProjectUseCase(
      projectRepository,
      userRepository
    )
    createTaskUseCase = new CreateTaskUseCase(taskRepository, projectRepository)
    createUserUseCase = new CreateUser(userRepository)

    sut = new FilterTaskUseCase(taskRepository, projectRepository)
  })

  it('should NOT be able to filter a task with a non-existent project', async () => {
    const filter = {
      status: 'Concluída',
      projectId: 'invalid_id'
    }

    await expect(sut.execute(filter)).rejects.toThrowError('Projeto não encontrado')
  })

  it('should NOT be able to filter a task with an invalid status', async () => {
    const user = await createUserUseCase.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user_password'
    })

    const project = await createProjectUseCase.execute({
      name: 'project',
      userId: user.id
    })

    const task = {
      name: 'task',
      responsible: 'task responsible',
      status: 'Invalid status',
      finishDate: new Date(),
      projectId: project.id
    }

    await expect(sut.execute(task)).rejects.toThrowError('Status inválido')
  })

  it('should be able to filter a task', async () => {
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
      status: 'Concluída' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: project.id
    }

    const createdTask = await createTaskUseCase.execute(task)

    const filter = {
      status: 'Concluída',
      projectId: project.id
    }

    const filteredTask = await sut.execute(filter)

    expect(filteredTask).toEqual([createdTask])
  })
})
