/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type CategoryService } from '../../application/services/category.service'
import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'

export class CategoryController {
  constructor (private readonly service: CategoryService) {}

  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  async getOne (req: Request<{ id: Id }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = await this.service.getOne({ id })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
