import { ProjectRepository } from '@application/repositories'
import {
  InMemoryProjectRepository,
  InMemoryTaskRepository
} from '@tests/repositories'
import { CreateTaskUseCase, GetTaskUseCase } from '.'
import { CreateProjectUseCase } from '../project'

describe('GetTaskUseCase', () => {
  let taskRepository: InMemoryTaskRepository
  let projectRepository: ProjectRepository
  let createProjectUseCase: CreateProjectUseCase
  let createTaskUseCase: CreateTaskUseCase
  let sut: GetTaskUseCase

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    projectRepository = new InMemoryProjectRepository()
    createProjectUseCase = new CreateProjectUseCase(projectRepository)
    createTaskUseCase = new CreateTaskUseCase(
      taskRepository,
      projectRepository
    )
    sut = new GetTaskUseCase(taskRepository)
  })

  it('should throw if task is not found', async () => {
    await expect(sut.execute({ id: 'invalid_id' })).rejects.toThrow()
  })

  it('should be able to return a task', async () => {
    const project = await createProjectUseCase.execute({
      name: 'project'
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
