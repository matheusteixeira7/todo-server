import { ProjectRepository } from '@application/repositories'
import { Project } from '@domain/entities'
import prisma from '../client'

export class PrismaProjectRepository implements ProjectRepository {
  async findById (id: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: {
        id
      }
    })
  }

  async findByIds (ids: string[]): Promise<Project[]> {
    return await prisma.project.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }

  async findByName (name: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: {
        name
      }
    })
  }

  async findByUser (id: string): Promise<Project[] | null> {
    return await prisma.project.findMany({
      where: {
        userId: id
      }
    })
  }

  async create (project: Project): Promise<Project> {
    return await prisma.project.create({
      data: {
        name: project.name,
        userId: project.userId
      }
    })
  }

  async update (project: Project): Promise<Project> {
    return prisma.project.update({
      where: {
        id: project.id
      },
      data: {
        name: project.name,
        userId: project.userId,
        updatedAt: project.updatedAt
      }
    })
  }

  async list (): Promise<Project[]> {
    return await prisma.project.findMany()
  }

  async delete (id: string): Promise<void> {
    await prisma.project.delete({
      where: {
        id
      }
    })
  }
}
