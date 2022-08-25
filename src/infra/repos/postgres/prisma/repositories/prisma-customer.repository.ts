import { CustomersRepository } from '@application/repositories'
import { Customer } from '@domain/entities'
import prisma from '../client'

export class PrismaCustomerRepository implements CustomersRepository {
  async findById (id: string): Promise<Customer | null> {
    return await prisma.customer.findUnique({
      where: {
        id
      }
    })
  }

  async findByEmail (email: string): Promise<Customer | null> {
    return await prisma.customer.findUnique({
      where: {
        email
      }
    })
  }

  async create (customer: Customer): Promise<Customer> {
    return await prisma.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt
      }
    })
  }

  async update (customer: Customer): Promise<Customer> {
    return await prisma.customer.update({
      where: {
        id: customer.id
      },
      data: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        updatedAt: customer.updatedAt
      }
    })
  }

  async delete (id: string): Promise<void> {
    await prisma.customer.delete({
      where: {
        id
      }
    })
  }

  async list (): Promise<Customer[]> {
    return await prisma.customer.findMany()
  }
}
