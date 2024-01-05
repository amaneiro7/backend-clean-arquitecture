import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { type CreateModelSeries } from '../../domain/entities/modelSeries.entity'
import { successResponses } from '../../utils/successResponse'
import { getAllModelSeries } from '../../application/get-all/getAllModelSeries'
import { getModelSeriesById } from '../../application/get/getModelSeriesById'
import { createNewModelSeries } from '../../application/create/createNewModelSeries'
import { updateModelSeries } from '../../application/update/updateModelSeries'

export class ModelSeriesController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await getAllModelSeries(this.repository)
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

  getOne = async (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await getModelSeriesById({ id, repository: this.repository })
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.body as CreateModelSeries
      const newData = await createNewModelSeries({ payload, repository: this.repository })
      successResponses.created({ res, data: newData })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const payload = req.body
      const newData = await updateModelSeries({ id, payload, repository: this.repository })
      successResponses.created({ res, data: newData })
    } catch (error) {
      next(error)
    }
  }
}
