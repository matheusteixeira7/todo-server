import { TaskRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  id: string
  name: string
  responsible: string
  status: string
  finishDate: Date
}

@injectable()
export class UpdateTaskUseCase {
  constructor (
    @inject('InMemoryProjectRepository')
    private taskRepository: TaskRepository
  ) {}

  async execute ({ id, name, responsible, status, finishDate }: TaskProps) {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new Error('Task not found')
    }

    Object.assign(task, {
      name,
      responsible,
      status,
      finishDate,
      updatedAt: new Date()
    })

    await this.taskRepository.update(task)

    return task
  }
}
