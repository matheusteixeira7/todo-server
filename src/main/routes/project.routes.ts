import { isAuthenticated } from '@main/middlewares/is-authenticated'
import { ProjectController } from '@infra/controllers'
import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

export const projectRouter = Router()
const projectController = new ProjectController()

projectRouter.get('/', isAuthenticated, projectController.list)

projectRouter.get('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  projectController.get
)

projectRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required()
    }
  }),
  projectController.create
)

projectRouter.put('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      tasks: Joi.array().items({
        name: Joi.string().required(),
        responsible: Joi.string().required(),
        status: Joi.string().required(),
        finishDate: Joi.date().required()
      })
    }
  }),
  projectController.update
)

projectRouter.delete('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  projectController.delete
)
