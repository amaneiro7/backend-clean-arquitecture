import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { HardDriveFinder } from '../../../../../../Contexts/Features/HardDrive.ts/HardDrive/application/HardDriveFinder'
import { HardDriveId } from '../../../../../../Contexts/Features/HardDrive.ts/HardDrive/domain/HardDriveId'
import { SearchAllHardDrive } from '../../../../../../Contexts/Features/HardDrive.ts/HardDrive/application/HardDriveFinderAll'

export class HardDriveGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllHardDrive(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new HardDriveFinder(this.repository).searchById(new HardDriveId(id))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
