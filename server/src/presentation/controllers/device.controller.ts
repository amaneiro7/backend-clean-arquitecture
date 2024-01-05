import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'
import { successResponses } from '../../utils/successResponse'
import { getAllDevices } from '../../application/get-all/getAllDevice'
import { type Repository } from '../../domain/repositories/respoitory'
import { getDeviceById } from '../../application/get/getDeviceById'

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

  // async create (req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const payload = req.body
  //     const newData = await this.service.create(payload)
  //     successResponses.created({ res, data: newData })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async update (req: Request<{ id: Id }>, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params
  //     const payload = req.body
  //     const newData = await this.service.update(id, payload)
  //     successResponses.created({ res, data: newData })
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
