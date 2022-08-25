import { InvalidParamError } from '@application/errors'
import { CustomersRepository, PetsRepository } from '@application/repositories'
import { Pet } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type PetPropsRequest = {
  name: string
  specie: 'dog' | 'cat'
  breed: string
  ownerId: string
}

@injectable()
export class CreatePet {
  constructor (
    @inject('PrismaPetRepository')
    private petsRepository: PetsRepository,
    @inject('PrismaCustomerRepository')
    private customersRepository: CustomersRepository

  ) {}

  async execute ({ name, specie, breed, ownerId }: PetPropsRequest) {
    const customer = await this.customersRepository.findById(ownerId)

    if (!customer) {
      throw new InvalidParamError('Customer does not exist.')
    }

    const newPet = Pet.create({
      name,
      specie,
      breed,
      ownerId: customer.id
    })

    this.petsRepository.create(newPet)

    return newPet
  }
}
