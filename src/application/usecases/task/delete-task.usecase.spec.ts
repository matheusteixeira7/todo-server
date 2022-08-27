import { ProjectRepository } from '@application/repositories'
import { InMemoryProjectRepository, InMemoryTaskRepository } from '@tests/repositories'
import { CreateProjectUseCase } from '../project'
import { CreateTaskUseCase, DeleteTaskUseCase } from './'

let taskRepository: InMemoryTaskRepository
let projectRepository: ProjectRepository
let createProjectUseCase: CreateProjectUseCase
let createTaskUseCase: CreateTaskUseCase
let sut: DeleteTaskUseCase

describe('DeleteTaskUseCase', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    projectRepository = new InMemoryProjectRepository()
    createProjectUseCase = new CreateProjectUseCase(projectRepository)
    createTaskUseCase = new CreateTaskUseCase(taskRepository, projectRepository)
    sut = new DeleteTaskUseCase(taskRepository)
  })

  it('should throw if task is not found', async () => {
    const promise = sut.execute({
      id: 'invalid_id'
    })

    await expect(promise).rejects.toThrow()
  })

  it('should delete task', async () => {
    const project = await createProjectUseCase.execute({
      name: 'project'
    })

    const task = await createTaskUseCase.execute({
      name: 'Task',
      responsible: 'Responsible',
      status: 'Pending',
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
