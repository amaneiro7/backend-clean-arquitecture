import { type Boom, isBoom } from '@hapi/boom'
import { type Request, type Response, type NextFunction } from 'express'
import * as winston from 'winston'

const file = new winston.transports.File({
  filename: '../logs/error.log',
  level: 'error',
  handleExceptions: true
})

export function unCoughtErrorHandler (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  winston.error(JSON.stringify(err))
  res.end({ error: err })
}

export function apiErrorHandler (
  err: any,
  req: Request,
  res: Response,
  message: string
): void {
  console.log('apiErrorHandler', err)
  const error: object = { Message: message, Request: req, Stack: err }
  winston.error(JSON.stringify(error))
  res.json({ Message: message })
}

export function boomErrorHandler (
  err: Error | Boom,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log('boomErrorHandler', err)

  if (isBoom(err)) {
    const { output } = err
    if (typeof output.payload.message === 'string') {
      output.payload.message = output.payload.message.replace(/"/g, '')
      // if (config.env === 'dev') {
      //   console.log('[boomErrorHandler]', output.payload.message, '[ENV]', config.env);
      // }
    }
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}
