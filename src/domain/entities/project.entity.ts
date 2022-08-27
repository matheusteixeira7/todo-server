import { randomUUID } from 'crypto'

type IProjectProps = {
  name: string
  userId: string
}

export class Project {
  id: string
  name: string
  userId: string
  createdAt?: Date
  updatedAt?: Date

  private constructor (props: IProjectProps) {
    this.id = this.id ?? randomUUID()
    this.name = props.name
    this.userId = props.userId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create (props: IProjectProps) {
    return new Project(props)
  }
}
