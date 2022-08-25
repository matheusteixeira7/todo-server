import { isAuthenticated } from '@main/middlewares/is-authenticated'
import { TransactionsController } from '@infra/controllers'
import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

export const transactionsRouter = Router()
const transactionsController = new TransactionsController()

transactionsRouter.get('/', isAuthenticated, transactionsController.list)

transactionsRouter.post('/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      servicesIds: Joi.array().items(Joi.string().uuid()).required(),
      totalPrice: Joi.number().required(),
      isPaid: Joi.boolean().required(),
      customerId: Joi.string().required()
    }
  }),
  transactionsController.create
)

transactionsRouter.get('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }), transactionsController.get
)

transactionsRouter.put('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      servicesIds: Joi.array().items(Joi.string().uuid()).required(),
      totalPrice: Joi.number().required(),
      isPaid: Joi.boolean().required(),
      customerId: Joi.string().required()
    }
  }),
  transactionsController.update
)

transactionsRouter.delete('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  transactionsController.delete
)
