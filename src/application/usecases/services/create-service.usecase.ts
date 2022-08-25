import { InvalidParamError } from '@application/errors'
import { ServicesRepository } from '@application/repositories'
import { Service } from '@domain/entities'
import { inject, injectable } from 'tsyringe'

type ServiceProps = {
  name: string
  price: number
}
@injectable()
export class CreateService {
  constructor (
    @inject('PrismaServiceRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({ name, price }: ServiceProps) {
    const service = await this.servicesRepository.findByName(name)

    if (service) {
      throw new InvalidParamError('Service already exists.')
    }

    const newService = Service.create({
      name,
      price
    })

    this.servicesRepository.create(newService)

    return newService
  }
}
