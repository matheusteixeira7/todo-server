import { User } from '@domain/entities'
import { InMemoryUsersRepository } from '@tests/repositories'
import { DeleteUser } from './'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUser

describe('Delete user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUser(usersRepository)
  })
  it('should throw error if user not found exists', async () => {
    await expect(sut.execute({
      id: '1'
    })).rejects.toThrow()
  })

  it('should be able to delete a user', async () => {
    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.create(user)

    await sut.execute({
      id: user.id
    })

    expect(usersRepository.items).toHaveLength(0)
  })
})
