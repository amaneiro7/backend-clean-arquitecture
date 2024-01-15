import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { successResponses } from '../../utils/successResponse'
import { createNewUser } from '../../application/create/createNewUser'
import { getUserById } from '../../application/get/getUserById'
import { type JWTUserPayload } from '../../domain/entities/User/user.entity'
import { updateUserPassword } from '../../application/update/updateUserPassword'

export class UserController {
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

  getUser = async (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { sub: id } = req.user as JWTUserPayload
      const data = await getUserById({ id, repository: this.repository })
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

  changePassword = async (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.body
      const { sub: id } = req.user as JWTUserPayload
      const newData = await updateUserPassword({ id, payload, repository: this.repository })
      successResponses.updated({ res, data: newData })
    } catch (error) {
      next(error)
    }
  }
}
