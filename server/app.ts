import express, { type Request, type Response } from 'express'
import { corsMiddleware } from './middleware/cors'
import { routerApi } from './presentation/routes/index.routes'

export const createApp = (): express.Express => {
  const app = express()

  app.use(express.json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Servidor de inventarios')
  })

  routerApi(app)

  return app
}
