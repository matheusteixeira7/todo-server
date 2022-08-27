import { ProjectRepository, UsersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type ProjectProps = {
  id: string
  name: string
  userId: string
}

@injectable()
export class UpdateProjectUseCase {
  constructor (
    @inject('PrismaProjectRepository')
    private projectRepository: ProjectRepository,
    @inject('PrismaUserRepository')
    private userRepository: UsersRepository
  ) {}

  async execute ({ id, name, userId }: ProjectProps) {
    const project = await this.projectRepository.findById(id)

    if (!project) {
      throw new Error('Project not found')
    }

    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    Object.assign(project, {
      name,
      userId,
      updatedAt: new Date()
    })

    await this.projectRepository.update(project)

    return project
  }
}
