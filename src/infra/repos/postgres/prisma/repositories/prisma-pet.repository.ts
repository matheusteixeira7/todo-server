import { PetsRepository } from '@application/repositories'
import { Pet } from '@domain/entities'
import prisma from '../client'

export class PrismaPetRepository implements PetsRepository {
  async findById (id: string): Promise<Pet | null> {
    return await prisma.pet.findUnique({
      where: {
        id
      }
    })
  }

  async findByName (name: string): Promise<Pet[] | null> {
    return await prisma.pet.findMany({
      where: {
        name
      }
    })
  }

  async findOwnerById (ownerId: string): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where: {
        ownerId
      }
    })
  }

  async create (pet: Pet): Promise<Pet> {
    return await prisma.pet.create({
      data: {
        id: pet.id,
        name: pet.name,
        specie: pet.specie,
        breed: pet.breed,
        ownerId: pet.ownerId,
        createdAt: pet.createdAt,
        updatedAt: pet.updatedAt
      }
    })
  }

  async update (pet: Pet): Promise<Pet> {
    return await prisma.pet.update({
      where: {
        id: pet.id
      },
      data: {
        name: pet.name,
        specie: pet.specie,
        breed: pet.breed,
        ownerId: pet.ownerId,
        updatedAt: pet.updatedAt
      }
    })
  }

  async delete (id: string): Promise<void> {
    await prisma.pet.delete({
      where: {
        id
      }
    })
  }

  async list (): Promise<Pet[]> {
    return await prisma.pet.findMany()
  }
}
