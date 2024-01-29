import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { SearchAllStatus } from '../../../../../Contexts/Device/Status/application/StatusFinder'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

export class StatusGetController {
  constructor (private readonly repository: Repository) {}
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllStatus(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
