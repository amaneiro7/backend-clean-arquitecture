import { type NextFunction, type Request, type Response } from 'express'
import { successResponses } from '../../utils/successResponse'
import { type UserOutput } from '../../domain/entities/user.entity'

export class AuthController {
  loginLocal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.user as UserOutput
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }
}
