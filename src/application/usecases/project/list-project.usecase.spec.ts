import { InMemoryProjectRepository } from '@tests/repositories'
import { CreateProjectUseCase } from './create-project.usecase'
import { ListProjectUseCase } from './list-project.usecase'

let projectRepository: InMemoryProjectRepository
let createProjectUseCase: CreateProjectUseCase
let sut: ListProjectUseCase

describe('ListProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    createProjectUseCase = new CreateProjectUseCase(projectRepository)
    sut = new ListProjectUseCase(projectRepository)
  })

  it('should be able to return all projects', async () => {
    const project1 = await createProjectUseCase.execute({ name: 'project1' })
    const project2 = await createProjectUseCase.execute({ name: 'project2' })

    const projects = await sut.execute()

    expect(projects).toHaveLength(2)
    expect(projects).toEqual([project1, project2])
  })
})
