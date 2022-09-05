import { CustomError } from '@application/errors'
import { ProjectRepository, TaskRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  status: string
  projectId: string
}

@injectable()
export class FilterTaskUseCase {
  constructor (
    @inject('PrismaTaskRepository')
    private taskRepository: TaskRepository,
    @inject('PrismaProjectRepository')
    private projectRepository: ProjectRepository

  ) {}

  async execute ({ status, projectId }: TaskProps) {
    const project = await this.projectRepository.findById(projectId)

    if (!project) {
      throw new CustomError(404, 'Projeto não encontrado')
    }

    if (status !== 'Concluída' && status !== 'Vencida' && status !== 'Pendente') {
      throw new CustomError(400, 'Status inválido')
    }

    return await this.taskRepository.filterByStatus(status, projectId)
  }
}
