import { isAuthenticated } from '@main/middlewares/is-authenticated'
import { TaskController } from '@infra/controllers'
import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

export const taskRouter = Router()
const taskController = new TaskController()

taskRouter.get('/', isAuthenticated, taskController.list)

taskRouter.get('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  taskController.get
)

taskRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      responsible: Joi.string().required(),
      status: Joi.string().required(),
      finishDate: Joi.date().required(),
      projectId: Joi.string().uuid().required()
    }
  }),
  taskController.create
)

taskRouter.put('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      responsible: Joi.string().required(),
      status: Joi.string().required(),
      finishDate: Joi.date().required(),
      projectId: Joi.string().uuid().required()
    }
  }),
  taskController.update
)

taskRouter.delete('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  taskController.delete
)
