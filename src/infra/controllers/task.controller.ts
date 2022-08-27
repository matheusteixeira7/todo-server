import { Request, Response } from 'express'
import { CreateTaskUseCase, DeleteTaskUseCase, GetTaskUseCase, ListTaskUseCase, UpdateTaskUseCase } from '@application/usecases/task'
import { container } from 'tsyringe'

export class TaskController {
  async list (req: Request, res: Response): Promise<Response> {
    const listTasks = container.resolve(ListTaskUseCase)
    const tasks = await listTasks.execute()
    return res.json(tasks)
  }

  async get (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const getTask = container.resolve(GetTaskUseCase)
    const task = await getTask.execute({ id })
    return res.json(task)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const createTask = container.resolve(CreateTaskUseCase)
    const task = await createTask.execute(req.body)
    return res.status(201).json(task)
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updateTask = container.resolve(UpdateTaskUseCase)
    const task = await updateTask.execute({ id, ...req.body })
    return res.json(task)
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleteTask = container.resolve(DeleteTaskUseCase)
    await deleteTask.execute({ id })
    return res.status(204).json()
  }
}
