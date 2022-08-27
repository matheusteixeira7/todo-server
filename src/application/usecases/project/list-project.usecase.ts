import { ProjectRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListProjectUseCase {
  constructor (
    @inject('PrismaProjectRepository')
    private projectRepository: ProjectRepository
  ) {}

  async execute () {
    return await this.projectRepository.list()
  }
}
