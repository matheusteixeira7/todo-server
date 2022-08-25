import { InvalidParamError } from '@application/errors'
import { ServicesRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

type UserProps = {
  id: string
}

@injectable()
export class GetService {
  constructor (
    @inject('PrismaServiceRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute ({ id }: UserProps) {
    const service = await this.servicesRepository.findById(id)

    if (!service) {
      throw new InvalidParamError('Service not found.')
    }

    return service
  }
}
