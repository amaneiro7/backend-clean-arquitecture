import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from 'http-status'
import { SearchAllModelSeries } from '../../../../../Contexts/ModelSeries/application/SearchAll/ModelSeriesFinder'
import { ModelSeriesFinder } from '../../../../../Contexts/ModelSeries/application/Find/ModelSeriesFinder'
import { ModelSeriesId } from '../../../../../Contexts/ModelSeries/domain/ModelSeriesId'
import { ModelSeriesName } from '../../../../../Contexts/ModelSeries/domain/ModelSeriesName'

export class ModelSeriesGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllModelSeries(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new ModelSeriesFinder(this.repository).searchById(new ModelSeriesId(id))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await new ModelSeriesFinder(this.repository).searchByName(new ModelSeriesName(id))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
