import { PetsRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListPets {
  constructor (
    @inject('PrismaPetRepository')
    private petsRepository: PetsRepository
  ) {}

  async execute () {
    return this.petsRepository.list()
  }
}
