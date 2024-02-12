import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { HardDriveUpdater } from '../../../../../../Contexts/Features/HardDrive.ts/HardDrive/application/HardDriveUpdater'

export class HardDrivePostController {
  constructor (private readonly repository: Repository) {}

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
