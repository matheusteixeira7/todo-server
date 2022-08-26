import { ProjectRepository } from '@application/repositories'
import { Project } from '@domain/entities'

export class InMemoryProjectRepository implements ProjectRepository {
  public items: Project[] = []

  async findById (id: string): Promise<Project | null> {
    const service = this.items.find(service => service.id === id)

    if (!service) {
      return null
    }

    return service
  }

  async findByIds (ids: string[]): Promise<Project[]> {
    return this.items.filter(project => ids.includes(project.id))
  }

  async findByName (name: string): Promise<Project | null> {
    const project = this.items.find(project => project.name === name)

    if (!project) {
      return null
    }

    return project
  }

  async create (project: Project): Promise<Project> {
    const findIndex = this.items.findIndex(item => item.id === project.id)

    if (findIndex === -1) {
      this.items.push(project)
    }

    return project
  }

  async update (project: Project): Promise<Project> {
    const findIndex = this.items.findIndex(item => item.id === project.id)

    if (findIndex !== -1) {
      this.items[findIndex] = project
    }

    return project
  }

  async list (): Promise<Project[]> {
    return this.items
  }

  async delete (id: string): Promise<void> {
    const index = this.items.findIndex(project => project.id === id)

    if (index === -1) {
      throw new Error('Service not found.')
    }

    this.items.splice(index, 1)
  }
}
