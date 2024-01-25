import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { DeviceCreator } from '../../../../../Contexts/Device/application/Create/DeviceCreator'
import { DeviceUpdater } from '../../../../../Contexts/Device/application/update/DeviceUpdater'

export class DevicePostController {
  constructor (private readonly repository: Repository) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { serial, activo, status, modelId } = req.body
      await new DeviceCreator(this.repository).run({ serial, activo, status, modelId })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { serial, activo, status, modelId } = req.body
      const { id } = req.params
      await new DeviceUpdater(this.repository).run({ id, serial, activo, status, modelId })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
