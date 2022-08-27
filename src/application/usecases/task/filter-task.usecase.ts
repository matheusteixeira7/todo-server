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
      throw new Error('Project not found')
    }

    if (status !== 'Concluída' && status !== 'Vencida' && status !== 'Pendente') {
      throw new Error('Invalid status')
    }

    return await this.taskRepository.filterByStatus(status, projectId)
  }
}
