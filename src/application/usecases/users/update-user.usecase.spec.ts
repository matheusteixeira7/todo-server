import { User } from '@domain/entities'
import { HashHandler } from '@infra/gateways'
import { InMemoryUsersRepository } from '@tests/repositories'
import { UpdateUser } from './'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUser

describe('Update user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUser(usersRepository)
  })

  it('should throw error if user not found exists', async () => {
    await expect(sut.execute({
      id: '1',
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456',
      oldPassword: '123456'
    })).rejects.toThrow()
  })

  it('should throw error if email already exists', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456'
    })

    const user2 = User.create({
      name: 'John Doe',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.create(user)
    await usersRepository.create(user2)

    await expect(sut.execute({
      id: user2.id,
      name: 'John Doe',
      email: 'doe@email.com'
    })).rejects.toThrow()
  })

  it('should not be able to update password if old password does not match', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456'
    })

    await usersRepository.create(user)

    await expect(sut.execute({
      id: user.id,
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456',
      oldPassword: 'wrong-password'
    })).rejects.toThrow()
  })

  it('should be able to update a user name', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.create(user)

    Object.assign(user, {
      props: {
        ...user,
        name: 'Matheus',
        email: 'doe@example.com'
      }
    })

    const result = await sut.execute({
      id: user.id,
      name: 'Matheus',
      email: 'doe@example.com'
    })

    expect(result.name).toEqual(user.name)
  })

  it('should be able to update a user email', async () => {
    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456'
    })

    await usersRepository.create(user)

    Object.assign(user, {
      props: {
        ...user,
        name: 'Matheus',
        email: 'doe@example.com'
      }
    })

    const result = await sut.execute({
      id: user.id,
      name: 'Matheus',
      email: 'doe@example.com'
    })

    expect(result.email).toEqual(user.email)
  })

  it('should not be able to update password if old password is not provided', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456'
    })

    await usersRepository.create(user)

    await expect(sut.execute({
      id: user.id,
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456'
    })).rejects.toThrow()
  })

  it('should be able to update a user password', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456'
    })

    await usersRepository.create(user)

    Object.assign(user, {
      ...user,
      name: 'John Doe',
      email: 'doe@email.com',
      password: await new HashHandler().generate('123456'),
      updatedAt: new Date()
    })

    const result = await sut.execute({
      id: user.id,
      name: 'John Doe',
      email: 'doe@email.com',
      password: '654321',
      oldPassword: '123456'
    })

    expect(result).not.toBe('123456')
  })
})
