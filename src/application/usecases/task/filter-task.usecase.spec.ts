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
      status: 'Concluída' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: 'invalid_id'
    }

    await expect(sut.execute(task)).rejects.toThrowError('Project not found')
  })

  it('should NOT be able to create a task with an invalid status', async () => {
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
      status: 'Invalid status' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: project.id
    }

    await expect(sut.execute(task)).rejects.toThrowError('Invalid status')
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
      status: 'Concluída' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: project.id
    }

    const createdTask = await sut.execute(task)

    expect(createdTask).toHaveProperty('id')
  })
})
