import httpStatus from '../../Shared/utils/http-status'
import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { SearchAllMainCategories } from '../../../../../Contexts/Category/Category/application/MainCategoryFinderAll'
import { MainCategoriesFinder } from '../../../../../Contexts/Category/Category/application/MainCategoryFinder'
import { MainCategoryId } from '../../../../../Contexts/Category/Category/domain/MainCategoryId'

export class MainCategoryGetController {
  constructor(private readonly repository: Repository) { }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllMainCategories(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new MainCategoriesFinder(this.repository).searchById(new MainCategoryId(id))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
