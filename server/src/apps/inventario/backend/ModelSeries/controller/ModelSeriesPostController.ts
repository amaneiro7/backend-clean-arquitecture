import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { ModelSeriesCreator } from '../../../../../Contexts/ModelSeries/ModelSeries/application/ModelSeriesCreator'
import { ModelSeriesUpdater } from '../../../../../Contexts/ModelSeries/ModelSeries/application/ModelSeriesUpdater'

export class ModelSeriesPostController {
  constructor (private readonly repository: Repository) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await new ModelSeriesCreator(this.repository).run(req.body)
      res.status(httpStatus.CREATED).json({ message: 'Modelo creado exitosamente' })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {      
      const { id } = req.params
      await new ModelSeriesUpdater(this.repository).run({ id, params: req.body })
      res.status(httpStatus.CREATED).json({ message: 'Modelo actualizado exitosamente' })
    } catch (error) {
      next(error)
    }
  }
}
