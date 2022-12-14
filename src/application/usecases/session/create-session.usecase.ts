import { CustomError } from '@application/errors'
import { UsersRepository } from '@application/repositories'
import { User } from '@domain/entities'
import { HashHandler, JwtTokenHandler } from '@infra/gateways'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
export class CreateSession {
  constructor (
    @inject('PrismaUserRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new CustomError(404, 'Usuário não encontrado')
    }

    const passwordConfirmed = await new HashHandler().compare(password, user.password)

    if (!passwordConfirmed) {
      throw new CustomError(401, 'Senha incorreta')
    }

    const token = await new JwtTokenHandler().generate(user.id)

    return { user, token }
  }
}
