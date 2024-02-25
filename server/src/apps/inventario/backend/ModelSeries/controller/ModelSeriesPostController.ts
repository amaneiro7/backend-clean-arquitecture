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
      res.status(httpStatus.CREATED).json({ message: 'Model Created' })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, categoryId, brandId } = req.body
      const { id } = req.params
      await new ModelSeriesUpdater(this.repository).run({ id, newName: name, categoryId, brandId })
      res.status(httpStatus.CREATED).json({ message: 'Model Updated' })
    } catch (error) {
      next(error)
    }
  }
}
