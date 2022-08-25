import { CreateTransaction, DeleteTransaction, GetTransaction, ListTransactions, UpdateTransaction } from '@application/usecases/transactions'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class TransactionsController {
  async list (req: Request, res: Response): Promise<Response> {
    const listTransactions = container.resolve(ListTransactions)
    const transactions = await listTransactions.execute()
    return res.json(transactions)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const createTransactions = container.resolve(CreateTransaction)
    const transaction = await createTransactions.execute({ ...req.body })
    return res.status(201).json(transaction)
  }

  async get (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const getTransaction = container.resolve(GetTransaction)
    const transaction = await getTransaction.execute(id)
    return res.json(transaction)
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updateTransaction = container.resolve(UpdateTransaction)
    const transaction = await updateTransaction.execute({ id, ...req.body })
    return res.json(transaction)
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleteTransaction = container.resolve(DeleteTransaction)
    await deleteTransaction.execute(id)
    return res.status(204).send()
  }
}
