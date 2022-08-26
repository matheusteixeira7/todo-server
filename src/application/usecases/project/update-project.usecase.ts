import { ProjectRepository } from '@application/repositories'
import { Task } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type ProjectProps = {
  id: string
  name: string
  tasks: Task[]
}

@injectable()
export class UpdateProjectUseCase {
  constructor (
    @inject('InMemoryProjectRepository')
    private projectRepository: ProjectRepository
  ) {}

  async execute ({ id, name, tasks }: ProjectProps) {
    const project = await this.projectRepository.findById(id)

    if (!project) {
      throw new Error('Project not found')
    }

    Object.assign(project, {
      name,
      tasks,
      updatedAt: new Date()
    })

    await this.projectRepository.update(project)

    return project
  }
}
