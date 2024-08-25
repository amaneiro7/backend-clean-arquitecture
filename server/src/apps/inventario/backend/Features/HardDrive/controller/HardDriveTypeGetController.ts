import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { SearchAllHardDriveType } from '../../../../../../Contexts/Features/HardDrive/HardDriveType/application/HardDriveTypeFinder'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'

export class HardDriveTypeGetController {
  constructor(private readonly repository: Repository) { }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllHardDriveType(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
