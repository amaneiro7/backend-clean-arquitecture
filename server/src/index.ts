import { json, type Application, type Request, type Response } from 'express'
import { corsMiddleware } from './middleware/cors'
import Routes from './presentation/routes/index.routes'

export default class Server {
  constructor (app: Application) {
    this.config(app)
    // eslint-disable-next-line no-new
    new Routes(app)
  }

  public config (app: Application): void {
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')

    app.get('/', (req: Request, res: Response) => {
      res.status(200).json('Servidor de inventarios')
    })
  }
}
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
