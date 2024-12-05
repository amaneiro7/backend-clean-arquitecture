import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import httpStatus from '../../Shared/utils/http-status'
import { SearchAllModelSeries } from '../../../../../Contexts/ModelSeries/ModelSeries/application/ModelSeriesFinderAll'
import { ModelSeriesFinder } from '../../../../../Contexts/ModelSeries/ModelSeries/application/ModelSeriesFinder'
import { ModelSeriesId } from '../../../../../Contexts/ModelSeries/ModelSeries/domain/ModelSeriesId'
import { ModelSeriesName } from '../../../../../Contexts/ModelSeries/ModelSeries/domain/ModelSeriesName'
import { SearchByCriteriaQuery } from '../../../../../Contexts/Shared/domain/SearchByCriteriaQuery'
import { ModelByCriteriaSearcher } from '../../../../../Contexts/ModelSeries/ModelSeries/application/ModelByCriteriaSearcher'
import { FiltersPrimitives } from '../../../../../Contexts/Shared/domain/criteria/Filter'

export class ModelSeriesGetController {
  constructor(private readonly repository: Repository) { }

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

      const data = await new ModelByCriteriaSearcher(this.repository).search(query)
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

  getByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.params
      const data = await new ModelSeriesFinder(this.repository).searchByName(new ModelSeriesName(name))
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
