import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from '../../Shared/utils/http-status'
import { SearchAllSite } from '../../../../../Contexts/Location/Site/application/SiteFinderAll'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

export class SiteGetController {
  constructor(private readonly repository: Repository) { }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllSite(this.repository).search()
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
