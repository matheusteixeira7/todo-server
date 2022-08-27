import { TaskRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListTaskUseCase {
  constructor (
    @inject('PrismaTaskRepository')
    private taskRepository: TaskRepository
  ) {}

  async execute () {
    return await this.taskRepository.list()
  }
}
