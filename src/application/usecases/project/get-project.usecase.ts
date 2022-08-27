import { ProjectRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type ProjectProps = {
  id: string
}

@injectable()
export class GetProjectUseCase {
  constructor (
    @inject('PrismaProjectRepository')
    private projectRepository: ProjectRepository
  ) {}

  async execute ({ id }: ProjectProps) {
    const projectExists = await this.projectRepository.findById(id)

    if (!projectExists) {
      throw new Error('Project not found')
    }

    return projectExists
  }
}
