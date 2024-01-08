import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { type UpdateDevice } from '../../domain/entities/DeviceAggregation/device.entity'
import { successResponses } from '../../utils/successResponse'
import { getAllDevices } from '../../application/get-all/getAllDevice'
import { getDeviceById } from '../../application/get/getDeviceById'
import { createNewDevice } from '../../application/create/createNewDevice'
import { updateDevice } from '../../application/update/updateDevice'

export class DeviceController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await getAllDevices(this.repository)
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

  getOne = async (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await getDeviceById({ id, repository: this.repository })
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.body
      const newData = await createNewDevice({ payload, repository: this.repository })
      successResponses.created({ res, data: newData })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const payload = req.body as UpdateDevice
      const newData = await updateDevice({ id, payload, repository: this.repository })
      successResponses.created({ res, data: newData })
    } catch (error) {
      next(error)
    }
  }
}
