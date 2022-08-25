import { randomUUID } from 'crypto'

type IServiceProps = {
  name: string
  price: number
}

export class Service {
  id: string
  name: string
  price: number
  createdAt?: Date
  updatedAt?: Date

  private constructor (props: IServiceProps) {
    this.id = this.id ?? randomUUID()
    this.name = props.name
    this.price = props.price
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create (props: IServiceProps) {
    return new Service(props)
  }
}
