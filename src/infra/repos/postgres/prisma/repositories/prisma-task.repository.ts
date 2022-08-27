import { TaskRepository } from '@application/repositories'
import { Task } from '@domain/entities'
import prisma from '../client'

export class PrismaTaskRepository implements TaskRepository {
  async findById (id: string): Promise<Task | null> {
    return await prisma.task.findUnique({
      where: {
        id
      }
    })
  }

  async findByIds (ids: string[]): Promise<Task[]> {
    return await prisma.task.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }

  async filterByStatus (status: string, projectId: string): Promise<Task[] | null> {
    return await prisma.task.findMany({
      where: {
        status,
        projectId
      }
    })
  }

  async create (task: Task): Promise<Task> {
    return await prisma.task.create({
      data: {
        name: task.name,
        responsible: task.responsible,
        status: task.status,
        finishDate: task.finishDate,
        projectId: task.projectId
      }
    })
  }

  async update (task: Task): Promise<Task> {
    return prisma.task.update({
      where: {
        id: task.id
      },
      data: {
        name: task.name,
        responsible: task.responsible,
        status: task.status,
        finishDate: task.finishDate,
        projectId: task.projectId,
        updatedAt: task.updatedAt
      }
    })
  }

  async list (): Promise<Task[]> {
    return await prisma.task.findMany()
  }

  async delete (id: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id
      }
    })
  }
}
