import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { DeviceCreator } from '../../../../../Contexts/Device/Device/application/Create/DeviceCreator'
import { DeviceUpdater } from '../../../../../Contexts/Device/Device/application/update/DeviceUpdater'

export class DevicePostController {
  constructor (private readonly repository: Repository) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const { serial, activo, statusId, modelId, ...restParams } = req.body

      await new DeviceCreator(this.repository).run(req.body)
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { serial, activo, statusId, modelId } = req.body
      const { id } = req.params
      await new DeviceUpdater(this.repository).run({ id, serial, activo, statusId, modelId })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
