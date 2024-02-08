import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { HardDriveCreator } from '../../../../../../Contexts/Features/HardDrive.ts/HardDrive/application/HardDriveCreator'
import { HardDriveUpdater } from '../../../../../../Contexts/Features/HardDrive.ts/HardDrive/application/HardDriveUpdater'

export class HardDrivePostController {
  constructor (private readonly repository: Repository) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { categoryId, deviceId, health, hardDriveTypeId, hardDriveCapacityId } = req.body
      await new HardDriveCreator(this.repository).run({ categoryId, deviceId, health, hardDriveTypeId, hardDriveCapacityId })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { health } = req.body
      const { id } = req.params
      await new HardDriveUpdater(this.repository).run({ id, newHealth: health })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
