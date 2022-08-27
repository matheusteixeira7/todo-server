import {
  InMemoryProjectRepository,
  InMemoryTaskRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { CreateProjectUseCase } from '../project'
import { CreateUser } from '../users'
import { CreateTaskUseCase, ListTaskUseCase } from './'

let projectRepository: InMemoryProjectRepository
let taskRepository: InMemoryTaskRepository
let userRepository: InMemoryUsersRepository

let createProjectUseCase: CreateProjectUseCase
let createTaskUseCase: CreateTaskUseCase
let createUserUseCase: CreateUser

let sut: ListTaskUseCase

describe('ListTaskUseCase', () => {
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

    sut = new ListTaskUseCase(taskRepository)
  })

  it('should be able to return all tasks', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const project = await createProjectUseCase.execute({
      name: 'project',
      userId: user.id
    })

    const task1 = await createTaskUseCase.execute({
      name: 'Task 1',
      responsible: 'Responsible 1',
      status: 'Concluída' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: project.id
    })
    const task2 = await createTaskUseCase.execute({
      name: 'Task 2',
      responsible: 'Responsible 2',
      status: 'Concluída' as 'Concluída' | 'Vencida' | 'Pendente',
      finishDate: new Date(),
      projectId: project.id
    })

    const projects = await sut.execute()

    expect(projects).toHaveLength(2)
    expect(projects).toEqual([task1, task2])
  })
})
