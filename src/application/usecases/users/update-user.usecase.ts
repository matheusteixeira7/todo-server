import { UsersRepository } from '@application/repositories'
import { inject, injectable } from 'tsyringe'
import { HashHandler } from '@infra/gateways'
import { CustomError } from '@application/errors'

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
      throw new CustomError(404, 'Usuário não encontrado')
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email)

    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new CustomError(400, 'Email já cadastrado')
    }

    if (password && !oldPassword) {
      throw new CustomError(400, 'Senha antiga não informada')
    }

    if (password && oldPassword) {
      const checkOldPassword = await new HashHandler().compare(oldPassword, user.password)

      if (!checkOldPassword) {
        throw new CustomError(401, 'Senha antiga não confere')
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
