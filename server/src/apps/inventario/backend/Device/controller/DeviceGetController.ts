import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { SearchAllDevices } from '../../../../../Contexts/Device/application/SearchAll/DeviceFinder'
import { DeviceFinder } from '../../../../../Contexts/Device/application/Find/DeviceFinder'
import { DeviceId } from '../../../../../Contexts/Device/domain/DeviceId'
import { DeviceSerial } from '../../../../../Contexts/Device/domain/DeviceSerial'
import { DeviceActivo } from '../../../../../Contexts/Device/domain/DeviceActivo'

export class DeviceGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllDevices(this.repository).search()
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