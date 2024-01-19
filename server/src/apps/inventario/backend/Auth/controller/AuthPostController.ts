import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'

export class AuthPostController {
  loginLocal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user
      res.status(httpStatus.OK).json(user)
    } catch (error) {
      next(error)
    }
  }
}
