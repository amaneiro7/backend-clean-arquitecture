/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'
import { type DeviceService } from '../../application/services/device.service'
import { successResponses } from '../../utils/successResponse'

export class DeviceController {
  constructor (private readonly service: DeviceService) {}

  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll()
      successResponses.success({ res, message: data })
    } catch (error) {
      next(error)
    }
  }

  async getOne (req: Request<{ id: Id }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = await this.service.getOne({ id })
      successResponses.success({ res, message: data })
    } catch (error) {
      next(error)
    }
  }

  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body
      const newData = await this.service.create(payload)
      successResponses.created({ res, message: newData })
    } catch (error) {
      next(error)
    }
  }

  async update (req: Request<{ id: Id }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const payload = req.body
      const newData = await this.service.update(id, payload)
      successResponses.created({ res, message: newData })
    } catch (error) {
      next(error)
    }
  }
}
