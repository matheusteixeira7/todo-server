import { InMemoryProjectRepository } from '@tests/repositories'
import { UpdateProjectUseCase, CreateProjectUseCase } from '.'

let projectRepository: InMemoryProjectRepository
let createProjectUseCase: CreateProjectUseCase
let sut: UpdateProjectUseCase

describe('DeleteProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    createProjectUseCase = new CreateProjectUseCase(projectRepository)
    sut = new UpdateProjectUseCase(projectRepository)
  })

  it('should throw if project is not found', async () => {
    const promise = sut.execute({
      id: 'invalid_id',
      name: 'any_name',
      tasks: []
    })

    await expect(promise).rejects.toThrow()
  })

  it('should update project', async () => {
    const { id } = await createProjectUseCase.execute({
      name: 'any_name'
    })

    const project = await sut.execute({
      id,
      name: 'new_name',
      tasks: []
    })

    expect(project.name).toBe('new_name')
  })
})
