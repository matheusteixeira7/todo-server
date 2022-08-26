import { ProjectRepository } from '@application/repositories'
import { Project } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type ProjectProps = {
  name: string
}

@injectable()
export class CreateProjectUseCase {
  constructor (
    @inject('InMemoryProjectRepository')
    private projectRepository: ProjectRepository
  ) {}

  async execute ({ name }: ProjectProps) {
    const projectExists = await this.projectRepository.findByName(name)

    if (projectExists) {
      throw new Error('Project already exists')
    }

    const project = Project.create({ name })

    return await this.projectRepository.create(project)
  }
}
