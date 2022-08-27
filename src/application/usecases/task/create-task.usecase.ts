import { ProjectRepository, TaskRepository } from '@application/repositories'
import { Task } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type TaskProps = {
  name: string
  responsible: string
  status: string
  finishDate: Date
  projectId: string
}

@injectable()
export class CreateTaskUseCase {
  constructor (
    @inject('InMemoryTaskRepository')
    private taskRepository: TaskRepository,
    @inject('InMemoryProjectRepository')
    private projectRepository: ProjectRepository
  ) {}

  async execute ({ name, responsible, status, finishDate, projectId }: TaskProps) {
    const taskExists = await this.taskRepository.findByName(name)

    if (taskExists) {
      throw new Error('Task already exists')
    }

    const project = await this.projectRepository.findById(projectId)

    if (!project) {
      throw new Error('Project not found')
    }

    const task = Task.create({ name, responsible, status, finishDate, projectId })

    return await this.taskRepository.create(task)
  }
}
