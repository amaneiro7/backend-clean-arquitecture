import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  res
    .set('Cache-Control', 'no-store')
    .status(httpStatus.OK)
    .json({ message: 'Token provided' })

  next()
}
