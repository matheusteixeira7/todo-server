import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '@application/repositories'
import { InvalidParamError } from '@application/errors'

type UserProps = {
  id: string
}

@injectable()
export class GetUser {
  constructor (
    @inject('PrismaUserRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute ({ id }: UserProps) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new InvalidParamError('User not found.')
    }

    return user
  }
}
