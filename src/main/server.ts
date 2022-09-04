import 'reflect-metadata'
import 'express-async-errors'
import 'module-alias/register'
import 'dotenv/config'
import '@infra/container'

import cors from 'cors'
import routes from './routes'
import express, { json, NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import { CustomError } from '@application/errors/custom-error'

const app = express()
app.use(cors())
app.use(json())
app.use(routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      return response.status(err.statusCode).json({
        message: err.message
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`
    })
  }
)

process.on('SIGTERM', () => {
  process.exit()
})

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT} 🚀`)
})
