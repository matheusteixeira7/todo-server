import { User } from '@domain/entities'
import { HashHandler } from '@infra/gateways'
import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '@application/repositories'
import { EmailInUseError } from '@application/errors'

type UserProps = {
  name: string
  email: string
  password: string
}

@injectable()
export class CreateUser {
  constructor (
    @inject('PrismaUserRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute ({ name, email, password }: UserProps) {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new EmailInUseError()
    }

    const hashedPassword = await new HashHandler().generate(password)

    const newUser = User.create({
      name,
      email,
      password: hashedPassword
    })

    this.usersRepository.create(newUser)

    return newUser
  }
}
