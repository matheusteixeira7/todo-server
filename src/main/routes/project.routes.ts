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

projectRouter.get('/filterByUser/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  projectController.filterByUser
)

projectRouter.post('/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      userId: Joi.string().uuid().required()
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
      userId: Joi.string().uuid().required()
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
