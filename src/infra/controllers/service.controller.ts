import { CreateService, DeleteService, GetService, ListServices, UpdateService } from '@application/usecases/services'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ServicesController {
  async list (req: Request, res: Response): Promise<Response> {
    const listServices = container.resolve(ListServices)
    const services = await listServices.execute()
    return res.json(services)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const createService = container.resolve(CreateService)
    const service = await createService.execute({ ...req.body })

    return res.status(201).json(service)
  }

  async get (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const getService = container.resolve(GetService)
    const service = await getService.execute({ id })
    return res.json(service)
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updateService = container.resolve(UpdateService)
    const service = await updateService.execute({ id, ...req.body })
    return res.json(service)
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleteService = container.resolve(DeleteService)
    await deleteService.execute({ id })
    return res.status(204).json()
  }
}
