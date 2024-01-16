import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { SearchAllCategories } from '../../../../../Contexts/Category/application/SearchAll/CategoryFinder'
import { CategoriesFinder } from '../../../../../Contexts/Category/application/Find/CategoryFinder'
import { CategoryId } from '../../../../../Contexts/Category/domain/CategoryId'
import { CategoryName } from '../../../../../Contexts/Category/domain/CategoryName'

export class CategoryGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllCategories(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new CategoriesFinder(this.repository).searchById(new CategoryId(id))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new CategoriesFinder(this.repository).searchByName(new CategoryName(id))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
