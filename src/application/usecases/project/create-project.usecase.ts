import { CustomError } from '@application/errors'
import { ProjectRepository, UsersRepository } from '@application/repositories'
import { Project } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type ProjectProps = {
  name: string
  userId: string
}

@injectable()
export class CreateProjectUseCase {
  constructor (
    @inject('PrismaProjectRepository')
    private projectRepository: ProjectRepository,
    @inject('PrismaUserRepository')
    private userRepository: UsersRepository
  ) {}

  async execute ({ name, userId }: ProjectProps) {
    const projectExists = await this.projectRepository.findByName(name)

    if (projectExists) {
      throw new CustomError(409, 'Project already exists')
    }

    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new CustomError(404, 'User not found')
    }

    const project = Project.create({ name, userId })

    return await this.projectRepository.create(project)
  }
}
