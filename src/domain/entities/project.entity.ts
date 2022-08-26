import { randomUUID } from 'crypto'
import { Task } from './task.entity'

type IProjectProps = {
  name: string
}

export class Project {
  id: string
  name: string
  tasks: Task[]
  createdAt?: Date
  updatedAt?: Date

  private constructor (props: IProjectProps) {
    this.id = this.id ?? randomUUID()
    this.name = props.name
    this.tasks = []
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create (props: IProjectProps) {
    return new Project(props)
  }
}
