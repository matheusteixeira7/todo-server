import { User } from '@domain/entities'
import { InMemoryUsersRepository } from '@tests/repositories'
import { CreateUser } from './'

let usersRepository: InMemoryUsersRepository
let sut: CreateUser

describe('Create user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUser(usersRepository)
  })
  it('should throw error if user already exists', async () => {
    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    usersRepository.items.push(user)

    await expect(sut.execute({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })).rejects.toThrow()
  })

  it('should be able to create a new user', async () => {
    const user = await sut.execute({
      name: 'Diego',
      email: 'asd@email.com',
      password: '123456'
    })

    expect(user).toBeInstanceOf(User)
  })
})
