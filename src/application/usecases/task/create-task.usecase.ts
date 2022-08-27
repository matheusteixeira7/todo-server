import { TaskRepository } from '@application/repositories'
import { Task } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  name: string
  responsible: string
  status: string
  finishDate: Date
}

@injectable()
export class CreateTaskUseCase {
  constructor (
    @inject('InMemoryTaskRepository')
    private taskRepository: TaskRepository
  ) {}

  async execute ({ name, responsible, status, finishDate }: TaskProps) {
    const taskExists = await this.taskRepository.findByName(name)

    if (taskExists) {
      throw new Error('Task already exists')
    }

    const task = Task.create({ name, responsible, status, finishDate })

    return await this.taskRepository.create(task)
  }
}
