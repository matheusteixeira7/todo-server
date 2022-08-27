import { TaskRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  id: string
}

@injectable()
export class DeleteTaskUseCase {
  constructor (
    @inject('PrismaTaskRepository')
    private taskRepository: TaskRepository
  ) {}

  async execute ({ id }: TaskProps) {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new Error('Task not found')
    }

    await this.taskRepository.delete(task.id)
  }
}
