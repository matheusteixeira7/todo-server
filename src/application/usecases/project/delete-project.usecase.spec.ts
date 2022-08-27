import { InMemoryProjectRepository } from '@tests/repositories'
import { CreateProjectUseCase, DeleteProjectUseCase } from './'

let projectRepository: InMemoryProjectRepository
let createProjectUseCase: CreateProjectUseCase
let sut: DeleteProjectUseCase

describe('DeleteProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    createProjectUseCase = new CreateProjectUseCase(projectRepository)
    sut = new DeleteProjectUseCase(projectRepository)
  })

  it('should throw if project is not found', async () => {
    const promise = sut.execute({
      id: 'invalid_id'
    })

    await expect(promise).rejects.toThrow()
  })

  it('should delete project', async () => {
    const project = await createProjectUseCase.execute({
      name: 'any_name'
    })

    await sut.execute({
      id: project.id
    })

    const projectFound = await projectRepository.findById(project.id)

    expect(projectFound).toBeNull()
  })
})
