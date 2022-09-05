import {
  InMemoryProjectRepository,
  InMemoryTaskRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { UpdateTaskUseCase, CreateTaskUseCase } from '.'
import { CreateProjectUseCase } from '../project'
import { CreateUser } from '../users'

let projectRepository: InMemoryProjectRepository
let taskRepository: InMemoryTaskRepository
let userRepository: InMemoryUsersRepository

let createProjectUseCase: CreateProjectUseCase
let createTaskUseCase: CreateTaskUseCase
let createUserUseCase: CreateUser

let sut: UpdateTaskUseCase

describe('UpdateTaskUseCase', () => {
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

    sut = new UpdateTaskUseCase(taskRepository, projectRepository)
  })

  it('should throw if task is not found', async () => {
    const promise = sut.execute({
      id: 'invalid_id',
      name: 'any_name',
      responsible: 'any_responsible',
      status: 'any_status',
      finishDate: new Date(),
      projectId: 'any_project_id'
    })

    await expect(promise).rejects.toThrowError('Tarefa não encontrada')
  })

  it('should throw if project is not found', async () => {
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
      name: 'task',
      responsible: 'task responsible',
      status: 'Concluída' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: project.id
    })

    const promise = sut.execute({
      id: task.id,
      name: 'any_name',
      responsible: 'any_responsible',
      status: 'any_status',
      finishDate: new Date(),
      projectId: 'invalid_id'
    })

    await expect(promise).rejects.toThrowError('Projeto não encontrado')
  })

  it('should throw if status is invalid', async () => {
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
      name: 'task',
      responsible: 'task responsible',
      status: 'Concluída' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: project.id
    })

    const promise = sut.execute({
      id: task.id,
      name: 'any_name',
      responsible: 'any_responsible',
      status: 'invalid_status',
      finishDate: new Date(),
      projectId: project.id
    })

    await expect(promise).rejects.toThrowError('Status inválido')
  })

  it('should update task', async () => {
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

    const updatedTask = await sut.execute({
      id: createdTask.id,
      name: 'updated task',
      responsible: 'updated task responsible',
      status: 'Pendente' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: project.id
    })

    expect(updatedTask.name).toBe('updated task')
    expect(updatedTask.responsible).toBe('updated task responsible')
    expect(updatedTask.status).toBe('Pendente')
  })
})
