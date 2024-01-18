import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { BrandCreator } from '../../../../../Contexts/Brand/application/Create/BrandCreator'

export class AuthPostController {
  constructor (private readonly repository: Repository) {}

  loginLocal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user
      res.status(httpStatus.OK).json(user)
    } catch (error) {
      next(error)
    }
  }
}
