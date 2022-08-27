import { InMemoryTaskRepository } from '@tests/repositories'
import { UpdateTaskUseCase, CreateTaskUseCase } from '.'

let taskRepository: InMemoryTaskRepository
let createTaskUseCase: CreateTaskUseCase
let sut: UpdateTaskUseCase

describe('UpdateTaskUseCase', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    createTaskUseCase = new CreateTaskUseCase(taskRepository)
    sut = new UpdateTaskUseCase(taskRepository)
  })

  it('should throw if project is not found', async () => {
    const promise = sut.execute({
      id: 'invalid_id',
      name: 'any_name',
      responsible: 'any_responsible',
      status: 'any_status',
      finishDate: new Date()
    })

    await expect(promise).rejects.toThrow()
  })

  it('should update project', async () => {
    const { id } = await createTaskUseCase.execute({
      name: 'any_name',
      responsible: 'any_responsible',
      status: 'any_status',
      finishDate: new Date()
    })

    const task = await sut.execute({
      id,
      name: 'new_name',
      responsible: 'new_responsible',
      status: 'new_status',
      finishDate: new Date()
    })

    expect(task.name).toBe('new_name')
    expect(task.responsible).toBe('new_responsible')
    expect(task.status).toBe('new_status')
  })
})
