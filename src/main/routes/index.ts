import { Router } from 'express'
import { customersRouter } from './customer.routes'
import { petsRouter } from './pet.routes'
import { servicesRouter } from './service.router'
import { sessionRouter } from './session.routes'
import { transactionsRouter } from './transaction.routes'
import { usersRouter } from './user.routes'

export const routes = Router()

routes.use('/users', usersRouter)
routes.use('/session', sessionRouter)
routes.use('/services', servicesRouter)
routes.use('/customers', customersRouter)
routes.use('/pets', petsRouter)
routes.use('/transactions', transactionsRouter)

export default routes
