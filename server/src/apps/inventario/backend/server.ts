import compress from 'compression'
import cookieParser from 'cookie-parser'
import errorHandler from 'errorhandler'
import express, { json, urlencoded, type Request, type Response } from 'express'
import cors from 'cors'
import Router from 'express-promise-router'
import helmet from 'helmet'
import type * as http from 'http'
import httpStatus from 'http-status'

import { routerApi } from './Shared/Routes'
import { type Repository } from '../../../Contexts/Shared/domain/Repository'
import { options } from './cors'

export class Server {
  private readonly app: express.Express
  private readonly port: string
  private httpServer?: http.Server

  constructor ({ port, repository }: { port: string, repository: Repository }) {
    this.port = port
    this.app = express()
    this.app.use(json())
    this.app.use(cors(options))
    this.app.use(urlencoded({ extended: true }))
    this.app.use(helmet.xssFilter())
    this.app.use(helmet.noSniff())
    this.app.use(helmet.hidePoweredBy())
    this.app.use(helmet.frameguard({ action: 'deny' }))
    this.app.use(compress())
    this.app.use(cookieParser())
    const router = Router()
    router.use(errorHandler())

    routerApi({ app: this.app, repository })

    router.use((err: Error, req: Request, res: Response, _next: () => void) => {
      console.log(err)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    })
  }

  async listen (): Promise<void> {
    await new Promise<void>(resolve => {
      const env = this.app.get('env') as string
      this.httpServer = this.app.listen(this.port, () => {
        console.log(`  Inventario Backend App is running at http://localhost:${this.port} in ${env} mode`)
        console.log('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  getHTTPServer (): Server['httpServer'] {
    return this.httpServer
  }

  async stop (): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.httpServer != null) {
        this.httpServer.close(error => {
          if (error != null) {
            reject(error)

            return
          }

          resolve()
        })
      }

      resolve()
    })
  }
}
