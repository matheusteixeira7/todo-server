import { ProjectRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type ProjectProps = {
  id: string
}

@injectable()
export class DeleteProjectUseCase {
  constructor (
    @inject('InMemoryProjectRepository')
    private projectRepository: ProjectRepository
  ) {}

  async execute ({ id }: ProjectProps) {
    const project = await this.projectRepository.findById(id)

    if (!project) {
      throw new Error('Project not found')
    }

    await this.projectRepository.delete(project.id)
  }
}