import { ServicesRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListServices {
  constructor (
    @inject('PrismaServiceRepository')
    private servicesRepository: ServicesRepository
  ) {}

  async execute () {
    return this.servicesRepository.list()
  }
}
