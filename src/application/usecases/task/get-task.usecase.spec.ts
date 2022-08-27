import { InMemoryTaskRepository } from '@tests/repositories'
import { CreateTaskUseCase, GetTaskUseCase } from '.'

let taskRepository: InMemoryTaskRepository
let createTaskUseCase: CreateTaskUseCase
let sut: GetTaskUseCase

describe('GetTaskUseCase', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    createTaskUseCase = new CreateTaskUseCase(taskRepository)
    sut = new GetTaskUseCase(taskRepository)
  })

  it('should throw if task is not found', async () => {
    await expect(sut.execute({ id: 'invalid_id' })).rejects.toThrow()
  })

  it('should be able to return a task', async () => {
    const task = await createTaskUseCase.execute({ name: 'Task 1', responsible: 'Responsible 1', status: 'Status 1', finishDate: new Date() })

    const result = await sut.execute({ id: task.id })

    expect(result).toEqual(task)
  })
})
