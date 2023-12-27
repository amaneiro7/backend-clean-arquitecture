/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'
import { successResponses } from '../../utils/successResponse'
import { type CreateUserService } from '../../application/services/create_user.service'
import { createUserService } from '../../dependecies/user.dependecies'

export class UserCreateController {
  constructor (private readonly service: CreateUserService) {}
  async create (req: Request<{ id: Id }>, res: Response, next: NextFunction) {
    try {
      const payload = req.body
      const newData = await this.service.create(payload)
      successResponses.created({ res, data: newData })
    } catch (error) {
      next(error)
    }
  }
}

export const userCreateController = new UserCreateController(createUserService)
