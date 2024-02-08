import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { SearchAllOperatingSystemArq } from '../../../../../../Contexts/Features/OperatingSystem/OperatingSystemArq/application/OperatingSystemArqFinderAll'

export class OperatingSystemArqGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllOperatingSystemArq(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
