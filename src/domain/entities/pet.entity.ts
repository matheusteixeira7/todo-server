import { randomUUID } from 'crypto'

type IPetProps = {
  name: string
  specie: 'dog' | 'cat'
  breed: string
  ownerId: string
}

export class Pet {
  id: string
  name: string
  specie: string
  breed: string
  ownerId: string
  createdAt?: Date
  updatedAt?: Date

  private constructor (props: IPetProps) {
    this.id = randomUUID()
    this.name = props.name
    this.specie = props.specie
    this.breed = props.breed
    this.ownerId = props.ownerId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create (props: IPetProps) {
    return new Pet(props)
  }
}
