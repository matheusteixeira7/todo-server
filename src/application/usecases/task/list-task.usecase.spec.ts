import { ProjectRepository } from '@application/repositories'
import {
  InMemoryProjectRepository,
  InMemoryTaskRepository
} from '@tests/repositories'
import { CreateProjectUseCase } from '../project'
import { CreateTaskUseCase, ListTaskUseCase } from './'

let taskRepository: InMemoryTaskRepository
let projectRepository: ProjectRepository
let createProjectUseCase: CreateProjectUseCase
let createTaskUseCase: CreateTaskUseCase
let sut: ListTaskUseCase

describe('ListTaskUseCase', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    projectRepository = new InMemoryProjectRepository()
    createProjectUseCase = new CreateProjectUseCase(projectRepository)
    createTaskUseCase = new CreateTaskUseCase(
      taskRepository,
      projectRepository
    )
    sut = new ListTaskUseCase(taskRepository)
  })

  it('should be able to return all tasks', async () => {
    const project = await createProjectUseCase.execute({
      name: 'project'
    })

    const task1 = await createTaskUseCase.execute({
      name: 'Task 1',
      responsible: 'Responsible 1',
      status: 'Status 1',
      finishDate: new Date(),
      projectId: project.id
    })
    const task2 = await createTaskUseCase.execute({
      name: 'Task 2',
      responsible: 'Responsible 2',
      status: 'Status 2',
      finishDate: new Date(),
      projectId: project.id
    })

    const projects = await sut.execute()

    expect(projects).toHaveLength(2)
    expect(projects).toEqual([task1, task2])
  })
})
