import { type NextFunction, type Request, type Response } from 'express'
// import { type Id } from '../../types/types'
import { successResponses } from '../../utils/successResponse'
import { type Repository } from '../../domain/repositories/respoitory'
import { getAllCategories } from '../../application/get-all/getAllCategories'

export class CategoryController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await getAllCategories(this.repository)
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

  // async getOne (req: Request<{ id: Id }>, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params
  //     const data = await this.service.getOne({ id })
  //     successResponses.success({ res, data })
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
