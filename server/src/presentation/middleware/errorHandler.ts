import { type Boom, isBoom } from '@hapi/boom'
import { type Request, type Response, type NextFunction } from 'express'
import { ValidationError } from 'sequelize'
import { isError } from 'joi'
import { successResponses } from '../../utils/successResponse'
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
  successResponses.error({ res, status: 500, isError: true, message: err.message })
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
    successResponses.error({ res, status: output.statusCode, isError: true, message: output.payload.message })
  }
  next(err)
}

export function ormErrorHandler (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log('ormErrorHandler')
  if (err instanceof ValidationError) {
    successResponses.error({ res, status: 409, isError: true, message: err.name })
  }
}

export function joiErrorHandler (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log('joiErrorHandler')
  if (isError(err)) {
    successResponses.error({ res, status: 400, isError: true, message: err.message })
  }
}
