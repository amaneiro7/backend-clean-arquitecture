import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { DeviceCreator } from '../../../../../Contexts/Device/Device/application/DeviceCreator'
import { DeviceUpdater } from '../../../../../Contexts/Device/Device/application/DeviceUpdater'

export class DevicePostController {
  constructor (private readonly repository: Repository) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await new DeviceCreator(this.repository).run(req.body)
      res.status(httpStatus.CREATED).json({ message: 'Device Created' })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await new DeviceUpdater(this.repository).run({ id, params: req.body })
      res.status(httpStatus.CREATED).json({ message: 'Device Updated' })
    } catch (error) {
      next(error)
    }
  }
}
