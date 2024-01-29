import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { DeviceRemover } from '../../../../../Contexts/Device/Device/application/remove/DeviceRemover'

export class DeviceDeleteController {
  constructor (private readonly repository: Repository) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await new DeviceRemover(this.repository).run({ id })
      res.status(httpStatus.OK).send()
    } catch (error) {
      next(error)
    }
  }
}
