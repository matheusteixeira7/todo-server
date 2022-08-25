import { Pet } from '@domain/entities'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByName(name: string): Promise<Pet[] | null>
  findOwnerById(ownerId: string): Promise<Pet[]>
  create (pet: Pet): Promise<Pet>
  update (pet: Pet): Promise<Pet>
  delete (id: string): Promise<void>
  list (): Promise<Pet[]>
}
