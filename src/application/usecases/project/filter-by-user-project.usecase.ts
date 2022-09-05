import { CustomError } from '@application/errors'
import { ProjectRepository, UsersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  id: string
}

@injectable()
export class FilterProjectByUserUseCase {
  constructor (
    @inject('PrismaUserRepository')
    private userRepository: UsersRepository,
    @inject('PrismaProjectRepository')
    private projectRepository: ProjectRepository

  ) {}

  async execute ({ id }: TaskProps) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new CustomError(404, 'Usuário não encontrado')
    }

    return await this.projectRepository.findByUser(id)
  }
}
