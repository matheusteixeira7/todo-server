import { Router } from 'express'
import { projectRouter } from './project.routes'
import { sessionRouter } from './session.routes'
import { taskRouter } from './task.routes'
import { usersRouter } from './user.routes'

export const routes = Router()

routes.use('/users', usersRouter)
routes.use('/session', sessionRouter)
routes.use('/project', projectRouter)
routes.use('/task', taskRouter)

export default routes
