import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { SearchAllComputer } from '../../../../../../Contexts/Features/Computer/application/ComputerFinderAll'

export class ComputerGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllComputer(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
