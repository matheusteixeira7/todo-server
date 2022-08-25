import { randomUUID } from 'crypto'

type ITransactionProps = {
  servicesIds: string[]
  totalPrice: number
  isPaid: boolean
  customerId: string
}

export class Transaction {
  id: string
  servicesIds: string[]
  totalPrice: number
  isPaid: boolean
  customerId: string
  createdAt?: Date
  updatedAt?: Date

  private constructor (props: ITransactionProps) {
    this.id = randomUUID()
    this.servicesIds = props.servicesIds
    this.totalPrice = props.totalPrice
    this.isPaid = props.isPaid
    this.customerId = props.customerId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create (props: ITransactionProps) {
    return new Transaction(props)
  }
}
