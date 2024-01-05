import { json, type Application, type Request, type Response, urlencoded } from 'express'
// import fs, { type WriteStream } from 'node:fs'
// import path from 'node:path'
import { corsMiddleware } from './middleware/cors'
import { routerApi } from './presentation/routes/index.routes'
import { type Repository } from './domain/repositories/respoitory'
// import morgan from 'morgan'
// import helmet from 'helmet'
// import winston from 'winston'

// export default class Server {
//   constructor (app: Application) {
//     this.config(app)
//     // eslint-disable-next-line no-new
//     new Routes(app)
//   }

//   public config (app: Application): void {
//     const accessLogStream: WriteStream = fs.createWriteStream(
//       path.join(__dirname, './logs/access.log'),
//       { flags: 'a' }
//     )
//     app.use(boomErrorHandler)
//     app.use(unCoughtErrorHandler)
//     app.use(morgan('combined', { stream: accessLogStream }))
//     app.use(urlencoded({ extended: true }))
//     app.disable('x-powered-by')
//     app.use(helmet())
//     app.use(json())
//     app.use(corsMiddleware())

//     app.get('/', (req: Request, res: Response) => {
//       res.status(200).json('Servidor de inventarios')
//     })
//   }
// }
// process.on('beforeExit', (err) => {
//   winston.error(JSON.stringify(err))
//   console.error(err)
// })
export const createServer = (app: Application, respoitory: Repository): Application => {
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.use(urlencoded({ extended: true }))

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Servidor de inventarios')
  })

  routerApi(app, respoitory)

  // const accessLogStream: WriteStream = fs.createWriteStream(
  //   path.join(__dirname, './logs/access.log'),
  //   { flags: 'a' }
  // )

  // app.use(morgan('combined', { stream: accessLogStream }))
  // app.use(helmet())

  return app
}
