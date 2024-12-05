import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from '../../Shared/utils/http-status'

export const deleteTokenHttpOnly = (req: Request, res: Response, next: NextFunction): void => {
  res
    .status(httpStatus.OK)
    .clearCookie('accessToken')
    .json({ message: 'Token Succesfully Removed' })

  next()
}
