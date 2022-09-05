import { CustomError } from '@application/errors'
import { ProjectRepository, TaskRepository } from '@application/repositories'
import { Task } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  name: string
  responsible: string
  status: 'Concluída' | 'Vencida' | 'Pendente'
  dueDate: Date
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

  async execute ({ name, responsible, status, dueDate, projectId }: TaskProps) {
    const project = await this.projectRepository.findById(projectId)

    if (!project) {
      throw new CustomError(404, 'Projeto não encontrado')
    }

    if (status !== 'Concluída' && status !== 'Vencida' && status !== 'Pendente') {
      throw new CustomError(400, 'Status inválido')
    }

    const task = Task.create({ name, responsible, status, dueDate, projectId })

    return await this.taskRepository.create(task)
  }
}
