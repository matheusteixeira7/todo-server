import { CustomError } from '@application/errors'
import { TaskRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  id: string
}

@injectable()
export class GetTaskUseCase {
  constructor (
    @inject('PrismaTaskRepository')
    private taskRepository: TaskRepository
  ) {}

  async execute ({ id }: TaskProps) {
    const taskExists = await this.taskRepository.findById(id)

    if (!taskExists) {
      throw new CustomError(404, 'Tarefa não encontrada')
    }

    return taskExists
  }
}
