/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { getStatusValues } from '../../application/services/status.service'

export class StatusController {
  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const data = getStatusValues()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
