import { ServicesRepository } from '@application/repositories'
import { Service } from '@domain/entities'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = []

  async findById (id: string): Promise<Service | null> {
    const service = this.items.find(service => service.id === id)

    if (!service) {
      return null
    }

    return service
  }

  async findByIds (ids: string[]): Promise<Service[]> {
    return this.items.filter(service => ids.includes(service.id))
  }

  async findByName (name: string): Promise<Service | null> {
    const service = this.items.find(service => service.name === name)

    if (!service) {
      return null
    }

    return service
  }

  async create (service: Service): Promise<Service> {
    const findIndex = this.items.findIndex(item => item.id === service.id)

    if (findIndex === -1) {
      this.items.push(service)
    }

    return service
  }

  async update (service: Service): Promise<Service> {
    const findIndex = this.items.findIndex(item => item.id === service.id)

    if (findIndex !== -1) {
      this.items[findIndex] = service
    }

    return service
  }

  async list (): Promise<Service[]> {
    return this.items
  }

  async delete (id: string): Promise<void> {
    const index = this.items.findIndex(service => service.id === id)

    if (index === -1) {
      throw new Error('Service not found.')
    }

    this.items.splice(index, 1)
  }
}
