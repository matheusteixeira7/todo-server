
import { CreateCustomer, DeleteCustomer, GetCustomer, ListCustomers, UpdateCustomer } from '@application/usecases/customers'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CustomersController {
  async list (req: Request, res: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomers)
    const customers = await listCustomers.execute()
    return res.json(customers)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const createCustomer = container.resolve(CreateCustomer)
    const customer = await createCustomer.execute({ ...req.body })
    return res.json(customer)
  }

  async get (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const getCustomer = container.resolve(GetCustomer)
    const customer = await getCustomer.execute({ id })
    return res.json(customer)
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleteCustomer = container.resolve(DeleteCustomer)
    await deleteCustomer.execute({ id })
    return res.status(204).json()
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updateCustomer = container.resolve(UpdateCustomer)
    const customer = await updateCustomer.execute({ id, ...req.body })
    return res.json(customer)
  }
}
