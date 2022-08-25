import { UsersRepository } from '@application/repositories'
import { User } from '@domain/entities'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById (id: string): Promise<User | null> {
    const user = this.items.find(user => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create (user: User): Promise<User> {
    const findIndex = this.items.findIndex(item => item.id === user.id)

    if (findIndex === -1) {
      this.items.push(user)
    }

    return user
  }

  async update (user: User): Promise<User> {
    const findIndex = this.items.findIndex(item => item.id === user.id)

    if (findIndex !== -1) {
      this.items[findIndex] = user
    }

    return user
  }

  async delete (id: string): Promise<void> {
    const index = this.items.findIndex(user => user.id === id)

    if (index === -1) {
      throw new Error('User not found.')
    }

    this.items.splice(index, 1)
  }

  async list (): Promise<User[]> {
    return this.items
  }
}
