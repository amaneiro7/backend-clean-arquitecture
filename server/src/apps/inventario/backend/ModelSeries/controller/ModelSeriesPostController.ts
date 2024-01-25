import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { ModelSeriesCreator } from '../../../../../Contexts/ModelSeries/application/Create/ModelSeriesCreator'
import { ModelSeriesUpdater } from '../../../../../Contexts/ModelSeries/application/update/ModelSeriesUpdater'

export class ModelSeriesPostController {
  constructor (private readonly repository: Repository) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, categoryId, brandId } = req.body
      await new ModelSeriesCreator(this.repository).run({ name, brandId, categoryId })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, categoryId, brandId } = req.body
      const { id } = req.params
      await new ModelSeriesUpdater(this.repository).run({ id, newName: name, categoryId, brandId })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
