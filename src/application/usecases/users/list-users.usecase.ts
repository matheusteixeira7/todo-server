import { UsersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListUsers {
  constructor (
    @inject('PrismaUserRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute () {
    return this.usersRepository.list()
  }
}
