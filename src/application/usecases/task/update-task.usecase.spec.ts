import { InMemoryProjectRepository, InMemoryTaskRepository } from '@tests/repositories'
import { UpdateTaskUseCase, CreateTaskUseCase } from '.'
import { CreateProjectUseCase } from '../project'

let taskRepository: InMemoryTaskRepository
let projectRepository: InMemoryProjectRepository
let createProjectUseCase: CreateProjectUseCase
let createTaskUseCase: CreateTaskUseCase
let sut: UpdateTaskUseCase

describe('UpdateTaskUseCase', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    projectRepository = new InMemoryProjectRepository()
    createTaskUseCase = new CreateTaskUseCase(taskRepository, projectRepository)
    createProjectUseCase = new CreateProjectUseCase(projectRepository)
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

    await expect(promise).rejects.toThrow()
  })

  it('should throw if project is not found', async () => {
    const project = await createProjectUseCase.execute({
      name: 'project'
    })

    const task = await createTaskUseCase.execute({
      name: 'task',
      responsible: 'task responsible',
      status: 'pendente',
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

    await expect(promise).rejects.toThrow()
  })

  it('should update task', async () => {
    const project = await createProjectUseCase.execute({
      name: 'project'
    })

    const task = {
      name: 'task',
      responsible: 'task responsible',
      status: 'pendente',
      finishDate: new Date(),
      projectId: project.id
    }

    const createdTask = await createTaskUseCase.execute(task)

    const updatedTask = await sut.execute({
      id: createdTask.id,
      name: 'updated task',
      responsible: 'updated task responsible',
      status: 'updated status',
      finishDate: new Date(),
      projectId: project.id
    })

    expect(updatedTask.name).toBe('updated task')
    expect(updatedTask.responsible).toBe('updated task responsible')
    expect(updatedTask.status).toBe('updated status')
  })
})
