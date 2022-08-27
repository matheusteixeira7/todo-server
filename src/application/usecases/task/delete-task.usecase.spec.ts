import { InMemoryTaskRepository } from '@tests/repositories'
import { CreateTaskUseCase, DeleteTaskUseCase } from './'

let taskRepository: InMemoryTaskRepository
let createTaskUseCase: CreateTaskUseCase
let sut: DeleteTaskUseCase

describe('DeleteTaskUseCase', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    createTaskUseCase = new CreateTaskUseCase(taskRepository)
    sut = new DeleteTaskUseCase(taskRepository)
  })

  it('should throw if task is not found', async () => {
    const promise = sut.execute({
      id: 'invalid_id'
    })

    await expect(promise).rejects.toThrow()
  })

  it('should delete task', async () => {
    const task = await createTaskUseCase.execute({
      name: 'Task',
      responsible: 'Responsible',
      status: 'Pending',
      finishDate: new Date()
    })

    await sut.execute({
      id: task.id
    })

    const taskFound = await taskRepository.findById(task.id)

    expect(taskFound).toBeNull()
  })
})
