import { TaskRepository } from '@application/repositories'
import { Task } from '@domain/entities'

export class InMemoryTaskRepository implements TaskRepository {
  public items: Task[] = []

  findById (id: string): Promise<Task | null> {
    throw new Error('Method not implemented.')
  }

  findByIds (ids: string[]): Promise<Task[]> {
    throw new Error('Method not implemented.')
  }

  findByName (name: string): Promise<Task | null> {
    throw new Error('Method not implemented.')
  }

  create (task: Task): Promise<Task> {
    throw new Error('Method not implemented.')
  }

  update (task: Task): Promise<Task> {
    throw new Error('Method not implemented.')
  }

  list (): Promise<Task[]> {
    throw new Error('Method not implemented.')
  }

  delete (id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
