import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { BrandsFinder } from '../../../../../Contexts/Brand/application/Find/BrandFinder'
import { BrandId } from '../../../../../Contexts/Brand/domain/BrandId'
import { BrandName } from '../../../../../Contexts/Brand/domain/BrandName'
import { SearchAllBrands } from '../../../../../Contexts/Brand/application/SearchAll/BrandFinder'

export class BrandGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllBrands(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const data = await new BrandsFinder(this.repository).searchById(new BrandId(id))
    res.status(httpStatus.OK).json(data)
  }

  getByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new BrandsFinder(this.repository).searchByName(new BrandName(id))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
