import { CustomError } from '@application/errors'
import { ProjectRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type ProjectProps = {
  id: string
}

@injectable()
export class DeleteProjectUseCase {
  constructor (
    @inject('PrismaProjectRepository')
    private projectRepository: ProjectRepository
  ) {}

  async execute ({ id }: ProjectProps) {
    const project = await this.projectRepository.findById(id)

    if (!project) {
      throw new CustomError(404, 'Projeto não encontrado')
    }

    await this.projectRepository.delete(project.id)
  }
}
