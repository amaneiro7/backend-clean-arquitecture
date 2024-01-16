import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { StatusFinder } from '../../../../../Contexts/Status/application/StatusFinder'

export class StatusGetController {
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new StatusFinder().search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
