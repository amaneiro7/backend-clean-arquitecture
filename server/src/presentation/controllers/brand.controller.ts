import { type NextFunction, type Request, type Response } from 'express'
// import { type Id } from '../../types/types'

import { successResponses } from '../../utils/successResponse'
import { getAllBrands } from '../../application/get-all/getAllBrands'
import { type Repository } from '../../domain/repositories/respoitory'

export class BrandController {
  constructor (private readonly repository: Repository) {}

  async getAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await getAllBrands(this.repository)
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

  // async getOne (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const { id } = req.params
  //     const data = await this.service.getOne({ id })
  //     successResponses.success({ res, data })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async create (req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const payload = req.body
  //     const newData = await this.service.create(payload)
  //     successResponses.created({ res, data: newData })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async update (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const { id } = req.params
  //     const payload = req.body
  //     const newData = await this.service.update(id, payload)
  //     successResponses.created({ res, data: newData })
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
