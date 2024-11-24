import httpStatus from '../../Shared/utils/http-status'
import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { DeviceCreator } from '../../../../../Contexts/Device/Device/application/DeviceCreator'
import { DeviceUpdater } from '../../../../../Contexts/Device/Device/application/DeviceUpdater'
import { JwtPayloadUser } from '../../../../../Contexts/Auth/domain/GenerateToken'

export class DevicePostController {
  constructor(private readonly repository: Repository) { }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as JwtPayloadUser
      await new DeviceCreator(this.repository).run({ params: req.body, user })
      res.status(httpStatus.CREATED).json({ message: 'Dispositivo creado exitosamente' })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const user = req.user as JwtPayloadUser
      await new DeviceUpdater(this.repository).run({ id, params: req.body, user })
      res.status(httpStatus.CREATED).json({ message: 'Dispositivo actualizado exitosamente' })
    } catch (error) {
      next(error)
    }
  }
}
