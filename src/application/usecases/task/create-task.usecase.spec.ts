import { TaskRepository } from '@application/repositories'
import { InMemoryTaskRepository } from '@tests/repositories'
import { CreateTaskUseCase } from './'

describe('CreateTaskUseCase', () => {
  let createTaskRepository: TaskRepository
  let sut: CreateTaskUseCase

  beforeEach(() => {
    createTaskRepository = new InMemoryTaskRepository()
    sut = new CreateTaskUseCase(createTaskRepository)
  })

  it('should NOT be able to create a task with the same name', async () => {
    const task = {
      name: 'task',
      responsible: 'task responsible',
      status: 'pendente',
      finishDate: new Date()
    }

    expect(async () => {
      await sut.execute(task)
      await sut.execute(task)
    }).rejects.toThrow()
  })
})
