import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { SearchAllLocation } from '../../../../../Contexts/Location/Location/application/LocationFinderAll'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { SearchByCriteriaQuery } from '../../../../../Contexts/Shared/domain/SearchByCriteriaQuery'
import { FiltersPrimitives } from '../../../../../Contexts/Shared/domain/criteria/Filter'
import { LocationByCriteriaSearcher } from '../../../../../Contexts/Location/Location/application/LocationByCriteriaSearcher'

export class LocationGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllLocation(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getByCriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { filters, orderBy, orderType, limit, offset } = req.query
      const query = new SearchByCriteriaQuery(
        filters ? filters as unknown as FiltersPrimitives[] : [],
        orderBy ? orderBy as string : undefined,
        orderType ? orderType as string : undefined,
        limit ? Number(limit) : undefined,
        offset ? Number(offset) : undefined
      )

      const data = await new LocationByCriteriaSearcher(this.repository).search(query)
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
