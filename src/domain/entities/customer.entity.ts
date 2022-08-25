import { randomUUID } from 'crypto'

type ICustomerProps = {
  name: string
  email: string
  phone: string
  address: string
}

export class Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt?: Date
  updatedAt?: Date

  private constructor (props: ICustomerProps) {
    this.id = randomUUID()
    this.name = props.name
    this.email = props.email
    this.phone = props.phone
    this.address = props.address
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create (props: ICustomerProps) {
    return new Customer(props)
  }
}
