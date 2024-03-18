import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { SearchAllInputType } from '../../../../../Contexts/ModelSeries/InputType/application/InputTypeFinder'

export class InputTypeGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllInputType(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
