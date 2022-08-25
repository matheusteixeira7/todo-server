import { InvalidParamError } from '@application/errors'
import { ServicesRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type ServiceProps = {
  id: string
}

@injectable()
export class DeleteService {
  constructor (
    @inject('PrismaServiceRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({ id }: ServiceProps) {
    const service = await this.servicesRepository.findById(id)

    if (!service) {
      throw new InvalidParamError('Service not found.')
    }

    this.servicesRepository.delete(id)
  }
}
