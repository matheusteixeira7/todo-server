import 'reflect-metadata'
import 'express-async-errors'
import 'module-alias/register'
import 'dotenv/config'
import '@infra/container'

import cors from 'cors'
import routes from './routes'
import express, { json } from 'express'

const app = express()
app.use(cors())
app.use(json())
app.use(routes)
app.use((req, res, next) => {
  res.type('json')
  next()
})

process.on('SIGTERM', () => {
  process.exit()
})

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT} 🚀`)
})
