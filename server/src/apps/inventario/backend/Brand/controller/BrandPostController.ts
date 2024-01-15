import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { BrandCreator } from '../../../../../Contexts/Brand/application/Create/BrandCreator'

export class BrandPostController {
  constructor (private readonly repository: Repository) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.body
      await new BrandCreator(this.repository).run({ name })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.body
      await new BrandCreator(this.repository).run({ name })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
