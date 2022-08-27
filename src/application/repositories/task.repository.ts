import { Task } from '@domain/entities'

export interface TaskRepository {
  findById(id: string): Promise<Task | null>
  findByIds(ids: string[]): Promise<Task[]>
  create (task: Task): Promise<Task>
  update (task: Task): Promise<Task>
  list (): Promise<Task[]>
  delete (id: string): Promise<void>
}
