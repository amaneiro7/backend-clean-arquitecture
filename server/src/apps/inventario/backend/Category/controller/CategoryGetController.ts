import httpStatus from '../../Shared/utils/http-status'
import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { SearchAllCategories } from '../../../../../Contexts/Category/SubCategory/application/CategoryFinderAll'
import { CategoriesFinder } from '../../../../../Contexts/Category/SubCategory/application/CategoryFinder'
import { CategoryId } from '../../../../../Contexts/Category/SubCategory/domain/CategoryId'
import { CategoryName } from '../../../../../Contexts/Category/SubCategory/domain/CategoryName'


export class CategoryGetController {
  constructor(private readonly repository: Repository) { }

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
      const { name } = req.params
      const data = await new CategoriesFinder(this.repository).searchByName(new CategoryName(name))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
