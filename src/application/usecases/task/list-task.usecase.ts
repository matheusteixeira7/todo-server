import { TaskRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListTaskUseCase {
  constructor (
    @inject('InMemoryTaskRepository')
    private taskRepository: TaskRepository
  ) {}

  async execute () {
    return await this.taskRepository.list()
  }
}
