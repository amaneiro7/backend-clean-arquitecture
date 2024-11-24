import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from '../../../Shared/utils/http-status'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { SearchAllOperatingSystem } from '../../../../../../Contexts/Features/OperatingSystem/OperatingSystem/application/OperatingSystemFinderAll'

export class OperatingSystemGetController {
  constructor(private readonly repository: Repository) { }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllOperatingSystem(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
