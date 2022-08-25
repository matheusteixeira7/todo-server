import { InvalidParamError } from '@application/errors'
import { ServicesRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type ServiceProps = {
  id: string
  name: string
  price: number
}

@injectable()
export class UpdateService {
  constructor (
    @inject('PrismaServiceRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({ id, name, price }: ServiceProps) {
    const service = await this.servicesRepository.findById(id)

    if (!service) {
      throw new Error('Service not found.')
    }

    const serviceNameUpdate = await this.servicesRepository.findByName(name)

    if (serviceNameUpdate && serviceNameUpdate.id !== id) {
      throw new InvalidParamError('Service name already in use')
    }

    Object.assign(service, {
      ...service,
      name,
      price,
      updatedAt: new Date()
    })

    this.servicesRepository.update(service)

    return service
  }
}
