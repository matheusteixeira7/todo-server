import { TaskRepository } from '@application/repositories'
import { Task } from '@domain/entities'

export class InMemoryTaskRepository implements TaskRepository {
  public items: Task[] = []

  async findById (id: string): Promise<Task | null> {
    const task = this.items.find(t => t.id === id)

    if (!task) {
      return null
    }

    return task
  }

  async findByIds (ids: string[]): Promise<Task[]> {
    return this.items.filter(t => ids.includes(t.id))
  }

  async findByName (name: string): Promise<Task | null> {
    const task = this.items.find(t => t.name === name)

    if (!task) {
      return null
    }

    return task
  }

  async create (task: Task): Promise<Task> {
    const findIndex = this.items.findIndex(t => t.id === task.id)

    if (findIndex === -1) {
      this.items.push(task)
    }

    return task
  }

  async update (task: Task): Promise<Task> {
    const findIndex = this.items.findIndex(t => t.id === task.id)

    if (findIndex !== -1) {
      this.items[findIndex] = task
    }

    return task
  }

  async list (): Promise<Task[]> {
    return this.items
  }

  async delete (id: string): Promise<void> {
    const index = this.items.findIndex(t => t.id === id)

    if (index === -1) {
      throw new Error('Service not found.')
    }

    this.items.splice(index, 1)
  }
}
