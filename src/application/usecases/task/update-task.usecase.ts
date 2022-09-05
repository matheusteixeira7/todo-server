import { CustomError } from '@application/errors'
import { ProjectRepository, TaskRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  id: string
  name: string
  responsible: string
  status: string
  dueDate: Date
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

  async execute ({ id, name, responsible, status, dueDate, projectId }: TaskProps) {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new CustomError(404, 'Tarefa não encontrada')
    }

    const project = await this.projectRepository.findById(projectId)

    if (!project) {
      throw new CustomError(404, 'Projeto não encontrado')
    }

    if (status !== 'Concluída' && status !== 'Vencida' && status !== 'Pendente') {
      throw new CustomError(400, 'Status inválido')
    }

    Object.assign(task, {
      name,
      responsible,
      status,
      dueDate,
      projectId,
      updatedAt: new Date()
    })

    await this.taskRepository.update(task)

    return task
  }
}
