import { InvalidParamError } from '@application/errors'
import { PetsRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type PetProps = {
  id: string
}

@injectable()
export class GetPet {
  constructor (
    @inject('PrismaPetRepository')
    private petsRepository: PetsRepository
  ) {}

  async execute ({ id }: PetProps) {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new InvalidParamError('Pet not found.')
    }

    return pet
  }
}
