import { type NextFunction, type Request, type Response } from 'express'
import { getStatusValues } from '../../application/get-all/getAllStatusValues'
import { successResponses } from '../../utils/successResponse'

export class StatusController {
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = getStatusValues()
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }
}
