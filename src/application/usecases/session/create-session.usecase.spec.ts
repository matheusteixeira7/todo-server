import { User } from '@domain/entities'
import { HashHandler } from '@infra/gateways'
import { InMemoryUsersRepository } from '@tests/repositories'
import { CreateSession } from './create-session.usecase'

let usersRepository: InMemoryUsersRepository
let sut: CreateSession

describe('Create session use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateSession(usersRepository)
  })

  it('should not be able to create a session if user not found', async () => {
    await expect(sut.execute({
      email: 'doe@example.com',
      password: '123456'
    })).rejects.toThrowError('User not found.')
  })

  it('should not be able to create a session if password does not match', async () => {
    const user = User.create({
      name: 'Diego',
      email: 'doe@email.com',
      password: await new HashHandler().generate('123456')
    })

    usersRepository.items.push(user)

    await expect(sut.execute({
      email: 'doe@email.com',
      password: '654321'
    })).rejects.toThrowError('Incorrect password.')
  })

  it('should return a token and a user', async () => {
    const user = User.create({
      name: 'Diego',
      email: 'doe@email.com',
      password: await new HashHandler().generate('123456')
    })

    usersRepository.items.push(user)

    const response = await sut.execute({
      email: 'doe@email.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })
})
