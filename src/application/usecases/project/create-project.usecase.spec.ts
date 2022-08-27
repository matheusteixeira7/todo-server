import { InMemoryProjectRepository } from '@tests/repositories'
import { CreateProjectUseCase } from './'

let projectRepository: InMemoryProjectRepository
let sut: CreateProjectUseCase

describe('CreateProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    sut = new CreateProjectUseCase(projectRepository)
  })

  it('should NOT be able to create a project with the same name', async () => {
    expect(async () => {
      await sut.execute({ name: 'project' })
      await sut.execute({ name: 'project' })
    }).rejects.toThrow()
  })

  it('should be able to create a project', async () => {
    const project = await sut.execute({ name: 'project' })

    expect(project).toHaveProperty('id')
  })
})
