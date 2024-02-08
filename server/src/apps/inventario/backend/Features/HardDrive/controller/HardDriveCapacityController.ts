import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { SearchAllHardDriveCapacity } from '../../../../../../Contexts/Features/HardDrive.ts/HardDriveCapacity/application/HardDriveCapacityFinder'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'

export class HardDriveCapacityGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllHardDriveCapacity(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
