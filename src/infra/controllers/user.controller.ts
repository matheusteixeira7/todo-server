import { Request, Response } from 'express'
import { ListUsers, CreateUser, GetUser, UpdateUser, DeleteUser } from '@application/usecases/users'
import { container } from 'tsyringe'

export class UsersController {
  async list (req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsers)
    const users = await listUsers.execute()
    return res.json(users)
  }

  async get (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const listUsers = container.resolve(GetUser)
    const user = await listUsers.execute({ id })
    return res.json(user)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUser)
    const user = await createUser.execute(req.body)
    return res.status(201).json(user)
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updateUser = container.resolve(UpdateUser)
    const user = await updateUser.execute({ id, ...req.body })
    return res.json(user)
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleteUser = container.resolve(DeleteUser)
    await deleteUser.execute({ id })
    return res.status(204).json()
  }
}
