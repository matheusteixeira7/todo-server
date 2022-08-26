import { InMemoryProjectRepository } from '@tests/repositories'
import { CreateProjectUseCase, GetProjectUseCase } from '.'

let projectRepository: InMemoryProjectRepository
let createProjectUseCase: CreateProjectUseCase
let sut: GetProjectUseCase

describe('GetProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    createProjectUseCase = new CreateProjectUseCase(projectRepository)
    sut = new GetProjectUseCase(projectRepository)
  })

  it('should return a project', async () => {
    const project = await createProjectUseCase.execute({ name: 'project' })

    const result = await sut.execute({ id: project.id })

    expect(result).toEqual(project)
  })
})
