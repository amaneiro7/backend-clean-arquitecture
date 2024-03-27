/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { SearchAllDevices } from '../../../../../Contexts/Device/Device/application/DeviceFinderAll'
import { DeviceFinder } from '../../../../../Contexts/Device/Device/application/DeviceFinder'
import { DeviceId } from '../../../../../Contexts/Device/Device/domain/DeviceId'
import { DeviceSerial } from '../../../../../Contexts/Device/Device/domain/DeviceSerial'
import { DeviceActivo } from '../../../../../Contexts/Device/Device/domain/DeviceActivo'
import { SearchByCriteriaQuery } from '../../../../../Contexts/Shared/domain/SearchByCriteriaQuery'
import { DeviceByCriteriaSearcher } from '../../../../../Contexts/Device/Device/application/DeviceByCriteriaSearcher'
import { type FiltersPrimitives } from '../../../../../Contexts/Shared/domain/criteria/Filter'

export class DeviceGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.query)
      const data = await new SearchAllDevices(this.repository).search(req.query)
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new DeviceFinder(this.repository).searchById(new DeviceId(id))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getByCriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { filters, orderBy, orderType, limit, offset } = req.query
      console.log('DeviceGetController Filters', filters)
      console.log(filters ? typeof JSON.parse(String(filters)) : 'undefined')
      const query = new SearchByCriteriaQuery(
        // filters ? filters as unknown as FiltersPrimitives[] : [],
        [],
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

  getBySerial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { serial } = req.params
      const data = await new DeviceFinder(this.repository).searchBySerial(new DeviceSerial(serial))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getByActivo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { activo } = req.params
      const data = await new DeviceFinder(this.repository).searchByactivo(new DeviceActivo(activo))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
