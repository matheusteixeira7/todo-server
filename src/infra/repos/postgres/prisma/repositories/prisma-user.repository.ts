import { UsersRepository } from '@application/repositories'
import { User } from '@domain/entities'
import prisma from '../client'

export class PrismaUserRepository implements UsersRepository {
  async findById (id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async findByEmail (email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async create (user: User): Promise<User> {
    return await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })
  }

  async update (user: User): Promise<User> {
    return await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        updatedAt: user.updatedAt
      }
    })
  }

  async delete (id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id
      }
    })
  }

  async list (): Promise<User[]> {
    return await prisma.user.findMany()
  }
}
