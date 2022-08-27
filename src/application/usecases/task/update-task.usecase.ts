import { ProjectRepository, TaskRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  id: string
  name: string
  responsible: string
  status: string
  finishDate: Date
  projectId: string
}

@injectable()
export class UpdateTaskUseCase {
  constructor (
    @inject('PrismaTaskRepository')
    private taskRepository: TaskRepository,
    @inject('PrismaProjectRepository')
    private projectRepository: ProjectRepository
  ) {}

  async execute ({ id, name, responsible, status, finishDate, projectId }: TaskProps) {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new Error('Task not found')
    }

    const project = await this.projectRepository.findById(projectId)

    if (!project) {
      throw new Error('Project not found')
    }

    if (status !== 'Concluída' && status !== 'Vencida' && status !== 'Pendente') {
      throw new Error('Invalid status')
    }

    Object.assign(task, {
      name,
      responsible,
      status,
      finishDate,
      projectId,
      updatedAt: new Date()
    })

    await this.taskRepository.update(task)

    return task
  }
}
