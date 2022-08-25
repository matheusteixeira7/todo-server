import { isAuthenticated } from '@main/middlewares/is-authenticated'
import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import { ServicesController } from '@infra/controllers'

export const servicesRouter = Router()
const servicesController = new ServicesController()

servicesRouter.get('/', isAuthenticated, servicesController.list)

servicesRouter.get('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  servicesController.get
)

servicesRouter.post('/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required()
    }
  }),
  servicesController.create
)

servicesRouter.put('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required()
    }
  }),
  servicesController.update
)

servicesRouter.delete('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  servicesController.delete
)
