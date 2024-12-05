import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from '../../Shared/utils/http-status'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { LocationCreator } from '../../../../../Contexts/Location/Location/application/LocationCreator'
import { LocationUpdater } from '../../../../../Contexts/Location/Location/application/LocationUpdater'

export class LocationPostController {
  constructor(private readonly repository: Repository) { }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await new LocationCreator(this.repository).run(req.body)
      res.status(httpStatus.CREATED).json({ message: 'Ubicación creado exitosamente' })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await new LocationUpdater(this.repository).run({ id, params: req.body })
      res.status(httpStatus.CREATED).json({ message: 'Ubicación actualizada exitosamente' })
    } catch (error) {
      next(error)
    }
  }
}
