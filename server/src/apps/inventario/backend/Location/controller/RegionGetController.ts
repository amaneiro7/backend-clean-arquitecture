import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { SearchAllRegion } from '../../../../../Contexts/Location/Region/application/RegionFinderAll'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

export class RegionGetController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllRegion(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }

//   getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const { id } = req.params
//       const data = await new ProcessorsFinder(this.repository).searchById(new ProcessorId(id))
//       res.status(httpStatus.OK).json(data)
//     } catch (error) {
//       next(error)
//     }
//   }
}
