import { Request, Response } from 'express'
import { CreateProjectUseCase, DeleteProjectUseCase, GetProjectUseCase, ListProjectUseCase, UpdateProjectUseCase, FilterProjectByUserUseCase } from '@application/usecases/project'
import { container } from 'tsyringe'

export class ProjectController {
  async list (req: Request, res: Response): Promise<Response> {
    const listProject = container.resolve(ListProjectUseCase)
    const projects = await listProject.execute()
    return res.json(projects)
  }

  async filterByUser (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const filterProjectByUser = container.resolve(FilterProjectByUserUseCase)
    const projects = await filterProjectByUser.execute({ id })
    return res.json(projects)
  }

  async get (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const getProject = container.resolve(GetProjectUseCase)
    const project = await getProject.execute({ id })
    return res.json(project)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const createProject = container.resolve(CreateProjectUseCase)
    const project = await createProject.execute(req.body)
    return res.status(201).json(project)
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updateProject = container.resolve(UpdateProjectUseCase)
    const project = await updateProject.execute({ id, ...req.body })
    return res.json(project)
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleteProject = container.resolve(DeleteProjectUseCase)
    await deleteProject.execute({ id })
    return res.status(204).json()
  }
}
