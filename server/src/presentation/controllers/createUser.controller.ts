import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { successResponses } from '../../utils/successResponse'
import { createNewUser } from '../../application/create/createNewUser'

export class UserCreateController {
  constructor (private readonly repository: Repository) {}
  create = async (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.body
      const newData = await createNewUser({ payload, repository: this.repository })
      successResponses.created({ res, data: newData })
    } catch (error) {
      next(error)
    }
  }
}
