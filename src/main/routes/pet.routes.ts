import { isAuthenticated } from '@main/middlewares/is-authenticated'
import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { PetsController } from '@infra/controllers'

export const petsRouter = Router()
const petsController = new PetsController()

petsRouter.get('/', isAuthenticated, petsController.list)

petsRouter.post('/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      specie: Joi.string().required(),
      breed: Joi.string().required(),
      ownerId: Joi.string().required()
    }
  }),
  petsController.create
)

petsRouter.get('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  petsController.get
)

petsRouter.get('/getowner/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  petsController.getOwner
)

petsRouter.delete('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  petsController.delete
)

petsRouter.put('/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      specie: Joi.string().required(),
      breed: Joi.string().required(),
      ownerId: Joi.string().required()
    }
  }),
  petsController.update
)
