import { ProjectRepository, TaskRepository } from '@application/repositories'
import { InMemoryProjectRepository, InMemoryTaskRepository } from '@tests/repositories'
import { CreateProjectUseCase } from '../project'
import { CreateTaskUseCase } from './'

describe('CreateTaskUseCase', () => {
  let taskRepository: TaskRepository
  let projectRepository: ProjectRepository
  let createProjectUseCase: CreateProjectUseCase
  let sut: CreateTaskUseCase

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    projectRepository = new InMemoryProjectRepository()
    createProjectUseCase = new CreateProjectUseCase(projectRepository)
    sut = new CreateTaskUseCase(taskRepository, projectRepository)
  })

  it('should NOT be able to create a task with the same name', async () => {
    const task = {
      name: 'task',
      responsible: 'task responsible',
      status: 'pendente',
      finishDate: new Date(),
      projectId: 'project id'
    }

    expect(async () => {
      await sut.execute(task)
      await sut.execute(task)
    }).rejects.toThrow()
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

    const createdTask = await sut.execute(task)

    expect(createdTask).toHaveProperty('id')
  })
})
