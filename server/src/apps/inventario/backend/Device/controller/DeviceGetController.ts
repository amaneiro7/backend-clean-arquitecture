/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { DeviceFinder } from '../../../../../Contexts/Device/Device/application/DeviceFinder'
import { SearchByCriteriaQuery } from '../../../../../Contexts/Shared/domain/SearchByCriteriaQuery'
import { DeviceByCriteriaSearcher } from '../../../../../Contexts/Device/Device/application/DeviceByCriteriaSearcher'
import { type FiltersPrimitives } from '../../../../../Contexts/Shared/domain/criteria/Filter'
import { DeviceComputerFinder } from '../../../../../Contexts/Device/Device/application/DeviceCoomputerFinder'

export class DeviceGetController {
  constructor(private readonly repository: Repository) { }
  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new DeviceFinder(this.repository).searchById(id)
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

      const data = await new DeviceByCriteriaSearcher(this.repository).search(query)
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getComputersByCriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { filters, orderBy, orderType, limit, offset } = req.query
      const query = new SearchByCriteriaQuery(
        filters ? filters as unknown as FiltersPrimitives[] : [],
        orderBy ? orderBy as string : undefined,
        orderType ? orderType as string : undefined,
        limit ? Number(limit) : undefined,
        offset ? Number(offset) : undefined
      )

      const data = await new DeviceComputerFinder(this.repository).search(query)
      res.status(httpStatus.OK).json(data)

    } catch (error) {
      next(error)
    }
  }
}
