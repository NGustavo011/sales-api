import 'reflect-metadata'
import 'express-async-errors'
import express, { type NextFunction, type Request, type Response } from 'express'
import cors from 'cors'
import { routes } from './routes'
import { AppError } from '@shared/errors/app-error'
import '@shared/typeorm'
import { errors } from 'celebrate'
import env, { loadEnvConfig } from '@config/env'

loadEnvConfig()

const app = express()
app.use(cors())
app.use(express.json())

app.use(routes)
app.use(errors())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(env.port, () => {
  console.log('Server started on port 3333!')
})
