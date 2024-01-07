import express, { type Application } from 'express'
import { createServer } from './src'
import { boomErrorHandler, errorHandler, joiErrorHandler, logErrors, ormErrorHandler } from './src/middleware/errorHandler'
import { type Repository } from './src/domain/repositories/respoitory'
import { repositoryInMemory } from './src/infrastructure/persistance/local-file-system'
import { type EmailAdapter } from './src/domain/adapters/email.adapter'
import { nodemailerEmailAdapater } from './src/infrastructure/email/sendMail.adapter'
// import Server from './src'
const repository: Repository = repositoryInMemory
const emailAdapter: EmailAdapter = nodemailerEmailAdapater
const app: Application = express()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const server: Server = new Server(app)
createServer({ app, repository, emailAdapter })
const port: number = 3000

app.listen(port, () => {
  console.info(`Server Running on port ${port}`)
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Server startup error: address already in use')
  } else {
    console.log(err)
  }
})

app.use(boomErrorHandler)
app.use(joiErrorHandler)
app.use(ormErrorHandler)
app.use(errorHandler)
app.use(logErrors)
