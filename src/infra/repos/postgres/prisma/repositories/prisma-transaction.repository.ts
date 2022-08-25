import { TransactionsRepository } from '@application/repositories'
import { Transaction } from '@domain/entities'
import prisma from '../client'

export class PrismaTransactionRepository implements TransactionsRepository {
  async findById (id: string): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({
      where: {
        id
      }
    })
  }

  async create (customer: Transaction): Promise<Transaction> {
    return await prisma.transaction.create({
      data: {
        id: customer.id,
        servicesIds: customer.servicesIds,
        totalPrice: customer.totalPrice,
        isPaid: customer.isPaid,
        customerId: customer.customerId,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt
      }
    })
  }

  async update (customer: Transaction): Promise<Transaction> {
    return await prisma.transaction.update({
      where: {
        id: customer.id
      },
      data: {
        servicesIds: customer.servicesIds,
        totalPrice: customer.totalPrice,
        isPaid: customer.isPaid,
        customerId: customer.customerId,
        updatedAt: customer.updatedAt
      }
    })
  }

  async list (): Promise<Transaction[]> {
    return await prisma.transaction.findMany()
  }

  async delete (id: string): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id
      }
    })
  }
}
