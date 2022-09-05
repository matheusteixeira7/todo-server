import {
  InMemoryProjectRepository,
  InMemoryUsersRepository
} from '@tests/repositories'
import { UpdateProjectUseCase, CreateProjectUseCase } from '.'
import { CreateUser } from '../users'

let projectRepository: InMemoryProjectRepository
let userRepository: InMemoryUsersRepository

let createUserUseCase: CreateUser
let createProjectUseCase: CreateProjectUseCase

let sut: UpdateProjectUseCase

describe('DeleteProjectUseCase', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    userRepository = new InMemoryUsersRepository()

    createUserUseCase = new CreateUser(userRepository)
    createProjectUseCase = new CreateProjectUseCase(
      projectRepository,
      userRepository
    )

    sut = new UpdateProjectUseCase(projectRepository, userRepository)
  })

  it('should throw if project is not found', async () => {
    const promise = sut.execute({
      id: 'invalid_id',
      name: 'any_name',
      userId: 'any_user_id'
    })

    await expect(promise).rejects.toThrowError('Projeto não encontrado')
  })

  it('should NOT update if user is not found', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const project = await createProjectUseCase.execute({
      name: 'any_name',
      userId: user.id
    })

    const promise = sut.execute({
      id: project.id,
      name: 'any_name',
      userId: 'invalid_id'
    })

    await expect(promise).rejects.toThrowError('Usuário não encontrado')
  })

  it('should update project', async () => {
    const user = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const user2 = await createUserUseCase.execute({
      name: 'any_name2',
      email: 'any_email2',
      password: 'any_password2'
    })

    const { id } = await createProjectUseCase.execute({
      name: 'any_name',
      userId: user.id
    })

    const project = await sut.execute({
      id,
      name: 'new_name',
      userId: user2.id
    })

    expect(project).toHaveProperty('id')
    expect(project.name).toBe('new_name')
    expect(project.userId).toBe(user2.id)
  })
})
