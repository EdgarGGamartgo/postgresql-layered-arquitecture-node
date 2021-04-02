import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { UserController } from './controllers/UserController'
import { errorHandler, NotFoundError } from '@oregtickets/common'

const app = express()
app.set('trust proxy', true)
app.use(json())

app.use(UserController)

app.all('*', async(req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }