import { InMemoryTaskRepository } from '@tests/repositories'
import { CreateTaskUseCase, ListTaskUseCase } from './'

let taskRepository: InMemoryTaskRepository
let createTaskUseCase: CreateTaskUseCase
let sut: ListTaskUseCase

describe('ListTaskUseCase', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    createTaskUseCase = new CreateTaskUseCase(taskRepository)
    sut = new ListTaskUseCase(taskRepository)
  })

  it('should be able to return all tasks', async () => {
    const task1 = await createTaskUseCase.execute({ name: 'Task 1', responsible: 'Responsible 1', status: 'Status 1', finishDate: new Date() })
    const task2 = await createTaskUseCase.execute({ name: 'Task 2', responsible: 'Responsible 2', status: 'Status 2', finishDate: new Date() })

    const projects = await sut.execute()

    expect(projects).toHaveLength(2)
    expect(projects).toEqual([task1, task2])
  })
})
