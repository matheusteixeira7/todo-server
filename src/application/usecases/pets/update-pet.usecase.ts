import { InvalidParamError } from '@application/errors'
import { PetsRepository, CustomersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type PetProps = {
  id: string
  name: string
  specie: 'dog' | 'cat'
  breed: string
  ownerId: string
}

@injectable()
export class UpdatePet {
  constructor (
    @inject('PrismaPetRepository')
    private petsRepository: PetsRepository,
    @inject('PrismaCustomerRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ id, name, specie, breed, ownerId }: PetProps) {
    const petOwner = await this.customersRepository.findById(ownerId)

    if (!petOwner) {
      throw new InvalidParamError('Owner not found')
    }

    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new InvalidParamError('Pet not found.')
    }

    Object.assign(pet, {
      ...pet,
      name,
      specie,
      breed,
      ownerId: petOwner.id,
      updatedAt: new Date()
    })

    this.petsRepository.update(pet)

    return pet
  }
}
