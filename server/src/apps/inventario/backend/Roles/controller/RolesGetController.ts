import httpStatus from '../../Shared/utils/http-status'
import { SearchAllRole } from '../../../../../Contexts/User/Role/application/RoleFinder'
import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

export class RolesGetController {
  constructor(private readonly repository: Repository) { }
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await new SearchAllRole(this.repository).search()
      res.status(httpStatus.OK).json(data)
    } catch (error) {
      next(error)
    }
  }
}
