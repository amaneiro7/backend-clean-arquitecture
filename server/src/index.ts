import { json, type Application, type Request, type Response, urlencoded } from 'express'
import fs, { type WriteStream } from 'node:fs'
import path from 'node:path'
import { corsMiddleware } from './middleware/cors'
import Routes from './presentation/routes/index.routes'
import morgan from 'morgan'
import helmet from 'helmet'
import winston from 'winston'
import { boomErrorHandler, unCoughtErrorHandler } from './middleware/errorHandler'

export default class Server {
  constructor (app: Application) {
    this.config(app)
    // eslint-disable-next-line no-new
    new Routes(app)
  }

  public config (app: Application): void {
    const accessLogStream: WriteStream = fs.createWriteStream(
      path.join(__dirname, './logs/access.log'),
      { flags: 'a' }
    )
    app.use(morgan('combined', { stream: accessLogStream }))
    app.use(urlencoded({ extended: true }))
    app.disable('x-powered-by')
    app.use(helmet())
    app.use(json())
    app.use(corsMiddleware())

    app.get('/', (req: Request, res: Response) => {
      res.status(200).json('Servidor de inventarios')
    })
    app.use(boomErrorHandler)
    app.use(unCoughtErrorHandler)
  }
}
process.on('beforeExit', (err) => {
  winston.error(JSON.stringify(err))
  console.error(err)
})
// export const createApp = (): express.Express => {
//   const app = express()

//   app.use(express.json())
//   app.use(corsMiddleware())
//   app.disable('x-powered-by')

//   app.get('/', (req: Request, res: Response) => {
//     res.status(200).json('Servidor de inventarios')
//   })

//   new Routes(app)

//   return app
// }
