import { ProjectRepository, TaskRepository } from '@application/repositories'
import { Task } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  name: string
  responsible: string
  status: 'Concluída' | 'Vencida' | 'Pendente'
  finishDate: Date
  projectId: string
}

@injectable()
export class CreateTaskUseCase {
  constructor (
    @inject('PrismaTaskRepository')
    private taskRepository: TaskRepository,
    @inject('PrismaProjectRepository')
    private projectRepository: ProjectRepository
  ) {}

  async execute ({ name, responsible, status, finishDate, projectId }: TaskProps) {
    const project = await this.projectRepository.findById(projectId)

    if (!project) {
      throw new Error('Project not found')
    }

    if (status !== 'Concluída' && status !== 'Vencida' && status !== 'Pendente') {
      throw new Error('Invalid status')
    }

    const task = Task.create({ name, responsible, status, finishDate, projectId })

    return await this.taskRepository.create(task)
  }
}
