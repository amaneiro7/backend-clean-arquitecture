import express, { type NextFunction, json, urlencoded, type Request, type Response, response } from 'express'
import Router from 'express-promise-router'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import errorHandler from 'errorhandler'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import type * as http from 'http'
import httpStatus from './Shared/utils/http-status'
import responseTime from 'response-time'
import notifier from 'node-notifier'

import { type Repository } from '../../../Contexts/Shared/domain/Repository'
import { routerApi } from './Shared/Routes'
import { options } from './Shared/Middleware/cors'
import { logger } from './Shared/Middleware/winstonError'
import { etagMiddleware } from './Shared/Middleware/etagMiddleware'
import { lastModifiedMiddleware } from './Shared/Middleware/lastModifiedMiddleware'
import { expiresMiddleware } from './Shared/Middleware/expiresMiddleware'
import { config } from '../../../../config/env.file'


export class Server {
  private readonly app: express.Express
  private readonly port: string
  private httpServer?: http.Server

  constructor({ port, repository }: { port: string, repository: Repository }) {
    this.port = port
    this.app = express()

    // Middlewares
    this.setupMiddlewares()

    // Configuración de rutas
    this.setupRoutes(repository)

  }

  private setupMiddlewares(): void {
    // Middlware para medir el tiempo de respuesta
    this.app.use(responseTime())

    // Middleware para logging con Morgan
    this.app.use(morgan('combined', {
      stream: {
        write: message => {
          logger.info(message)
        }
      }
    }))

    // Middleware de seguridad con Helmet
    this.app.use(helmet.xssFilter())
    this.app.use(helmet.noSniff())
    this.app.use(helmet.hidePoweredBy())
    this.app.use(helmet.frameguard({ action: 'deny' }))

    // Middleware para CORS
    this.app.use(cors(options))

    // Middleware para parsear JSON
    this.app.use(json())

    // Middleware para parsear URL-encoded
    this.app.use(urlencoded({ extended: true }))

    // Middleware para cookies firmadas
    this.app.use(cookieParser())

    // Middleware para comprimir las respuestas
    this.app.use(compress())

    // Middleare para manejo de errores
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
      logger.error('Error;', err.message)
      next(err)
    })

    // Middlewares opcionales de cache
    // this.app.use(cacheMiddleware)
    this.app.use(expiresMiddleware)
    this.app.use(lastModifiedMiddleware)
    this.app.use(etagMiddleware)
  }

  private setupRoutes(repository: Repository): void {
    const router = Router()
    if (!config.isProd) {
      router.use(errorHandler({
        log: this.errorNotification
      }))
    }

    // Configuración de rutas
    routerApi({ app: this.app, repository })

    // Manejo de errores global
    router.use((err: Error, req: Request, res: Response, _next: () => void) => {
      res.status(httpStatus.BAD_REQUEST).send(err.message)
    })
    this.app.use(router)
  }

  async listen(): Promise<void> {
    await new Promise<void>(resolve => {
      const env = this.app.get('env') as string
      this.httpServer = this.app.listen(this.port, () => {
        console.log(`  Inventario Backend App is running at http://localhost:${this.port} in ${env} mode`)
        console.log('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  errorNotification(err: Error, str: string, req: Request) {
    const title = 'Error in ' + req.method + ' ' + req.url
    notifier.notify({
      title: title,
      message: str
    })
  }

  getHTTPServer(): Server['httpServer'] {
    return this.httpServer
  }

  async stop(): Promise<void> {
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
