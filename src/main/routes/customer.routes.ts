import { Router } from 'express'
import { CustomersController } from '@infra/controllers'
import { celebrate, Joi, Segments } from 'celebrate'
import { isAuthenticated } from '@main/middlewares/is-authenticated'

export const customersRouter = Router()
const customersController = new CustomersController()

customersRouter.get('/', isAuthenticated, customersController.list)

customersRouter.post('/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required()
    }
  }),
  customersController.create
)

customersRouter.delete('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.delete
)
customersRouter.get('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.get
)

customersRouter.put('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required()
    }
  }),
  customersController.update
)
