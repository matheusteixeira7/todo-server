import { User } from '@domain/entities'
import { InMemoryUsersRepository } from '@tests/repositories'
import { GetUser } from './'

let usersRepository: InMemoryUsersRepository
let sut: GetUser

describe('Get user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUser(usersRepository)
  })
  it('should throw error if user do not exists', async () => {
    await expect(sut.execute({
      id: '1'
    })).rejects.toThrow()
  })

  it('should be able to get an user', async () => {
    const user = User.create({
      name: 'Diego',
      email: 'asd@email.com',
      password: '123456'
    })

    await usersRepository.create(user)

    const result = await sut.execute({
      id: user.id
    })

    expect(result).toEqual(user)
  })
})
