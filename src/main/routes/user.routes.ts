import { isAuthenticated } from '@main/middlewares/is-authenticated'
import { UsersController } from '@infra/controllers'
import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

export const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', isAuthenticated, usersController.list)

usersRouter.get('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  usersController.get
)

usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      oldPassword: Joi.string()
    }
  }),
  usersController.create
)

usersRouter.put('/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      oldPassword: Joi.string()
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  usersController.update
)

usersRouter.delete('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  usersController.delete
)
