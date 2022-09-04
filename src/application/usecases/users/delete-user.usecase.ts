import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '@application/repositories'
import { CustomError } from '@application/errors'

type UserProps = {
  id: string
}

@injectable()
export class DeleteUser {
  constructor (
    @inject('PrismaUserRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute ({ id }: UserProps) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new CustomError(404, 'User not found.')
    }

    this.usersRepository.delete(id)
  }
}
