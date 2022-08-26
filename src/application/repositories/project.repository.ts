import { Project } from '@domain/entities'

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>
  findByIds(ids: string[]): Promise<Project[]>
  findByName(name: string): Promise<Project | null>
  create (project: Project): Promise<Project>
  update (project: Project): Promise<Project>
  list (): Promise<Project[]>
  delete (id: string): Promise<void>
}
