import { ServicesRepository } from '@application/repositories'
import { Service } from '@domain/entities'
import prisma from '../client'

export class PrismaServiceRepository implements ServicesRepository {
  async findById (id: string): Promise<Service | null> {
    return await prisma.service.findUnique({
      where: {
        id
      }
    })
  }

  async findByIds (ids: string[]): Promise<Service[]> {
    return await prisma.service.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }

  async findByName (name: string): Promise<Service | null> {
    return await prisma.service.findUnique({
      where: {
        name
      }
    })
  }

  async create (service: Service): Promise<Service> {
    return await prisma.service.create({
      data: {
        id: service.id,
        name: service.name,
        price: service.price,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt
      }
    })
  }

  update (service: Service): Promise<Service> {
    return prisma.service.update({
      where: {
        id: service.id
      },
      data: {
        name: service.name,
        price: service.price,
        updatedAt: service.updatedAt
      }
    })
  }

  async list (): Promise<Service[]> {
    return await prisma.service.findMany()
  }

  async delete (id: string): Promise<void> {
    await prisma.service.delete({
      where: {
        id
      }
    })
  }
}
