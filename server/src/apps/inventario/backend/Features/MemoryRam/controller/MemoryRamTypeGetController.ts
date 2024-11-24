import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from '../../../Shared/utils/http-status'
import { SearchAllMemoryRamType } from '../../../../../../Contexts/Features/MemoryRam/MemoryRamType/application/SearchAllMemoryRamType'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'

export class MemoryRamTypeGetController {
  constructor(private readonly repository: Repository) { }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllMemoryRamType(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
