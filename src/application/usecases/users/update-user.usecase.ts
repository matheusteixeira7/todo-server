import { UsersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'
import { HashHandler } from '@infra/gateways'
import { EmailInUseError, InvalidParamError } from '@application/errors'

type UserProps = {
  id: string
  name: string
  email: string
  password?: string
  oldPassword?: string
}

@injectable()
export class UpdateUser {
  constructor (
    @inject('PrismaUserRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute ({ id, name, email, password, oldPassword }: UserProps) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new InvalidParamError('User not found.')
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email)

    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new EmailInUseError()
    }

    if (password && !oldPassword) {
      throw new InvalidParamError('Old password is required')
    }

    if (password && oldPassword) {
      const checkOldPassword = await new HashHandler().compare(oldPassword, user.password)

      if (!checkOldPassword) {
        throw new Error('Old password does not match')
      }

      user.password = await new HashHandler().generate(password)
    }

    Object.assign(user, {
      ...user,
      name,
      email,
      updatedAt: new Date()
    })

    this.usersRepository.update(user)

    return user
  }
}
