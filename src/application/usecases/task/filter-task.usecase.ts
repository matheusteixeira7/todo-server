import { TaskRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  status: string
  projectId: string
}

@injectable()
export class FilterTaskUseCase {
  constructor (
    @inject('PrismaTaskRepository')
    private taskRepository: TaskRepository

  ) {}

  async execute ({ status, projectId }: TaskProps) {
    if (status !== 'Concluída' && status !== 'Vencida' && status !== 'Pendente') {
      throw new Error('Invalid status')
    }

    return await this.taskRepository.filterByStatus(status, projectId)
  }
}
