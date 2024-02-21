import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'

export const deleteTokenHttpOnly = (req: Request, res: Response, next: NextFunction): void => {
  res
    .status(httpStatus.OK)
    .clearCookie('accessToken', { httpOnly: true, expires: new Date(0) })
    .json({ message: 'Token Succesfully Removed' })

  next()
}
