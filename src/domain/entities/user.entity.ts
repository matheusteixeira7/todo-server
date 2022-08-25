import { randomUUID } from 'crypto'

type IUserProps = {
  name: string
  email: string
  password: string
}

export class User {
  id: string
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date

  constructor (props: IUserProps) {
    this.id = this.id ?? randomUUID()
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create (props: IUserProps) {
    return new User(props)
  }
}
