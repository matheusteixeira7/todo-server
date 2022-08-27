import { randomUUID } from 'crypto'

type ITaskProps = {
  name: string
  responsible: string
  status: 'Concluída' | 'Vencida' | 'Pendente'
  finishDate: Date
  projectId: string
}

export class Task {
  id: string
  name: string
  responsible: string
  status: 'Concluída' | 'Vencida' | 'Pendente'
  finishDate: Date
  projectId: string
  createdAt?: Date
  updatedAt?: Date

  private constructor (props: ITaskProps) {
    this.id = this.id ?? randomUUID()
    this.name = props.name
    this.responsible = props.responsible
    this.status = props.status
    this.finishDate = props.finishDate
    this.projectId = props.projectId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create (props: ITaskProps) {
    return new Task(props)
  }
}
