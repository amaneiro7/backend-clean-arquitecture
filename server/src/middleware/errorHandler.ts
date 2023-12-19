import { type Boom, isBoom } from '@hapi/boom'
import { type Request, type Response, type NextFunction } from 'express'
import { ValidationError } from 'sequelize'
import { isError } from 'joi'
// import * as winston from 'winston'

// const file = new winston.transports.File({
//   filename: '../logs/error.log',
//   level: 'error',
//   handleExceptions: true
// })

// export function unCoughtErrorHandler (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void {
//   winston.error(JSON.stringify(err))
//   res.end({ error: err })
// }

export function logErrors (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(err)
  next(err)
}

export function errorHandler (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(500).json({
    statusCode: 500,
    message: err.message,
    error: err.stack
  })
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
    res.status(output.statusCode).json({
      statusCode: output.statusCode,
      message: output.payload,
      error: err.name
    })
  }
  next(err)
}

export function ormErrorHandler (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      error: err.errors
    })
  }
}

export function joiErrorHandler (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (isError(err)) {
    res.status(400).json({
      statusCode: 400,
      message: err.message,
      error: err
    })
  }
}
