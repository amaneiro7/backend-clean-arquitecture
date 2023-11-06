/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { getStatusValues } from '../../application/services/status.service'
import { successResponses } from '../../utils/successResponse'

export class StatusController {
  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const data = getStatusValues()
      successResponses.success({ res, message: data })
    } catch (error) {
      next(error)
    }
  }
}
