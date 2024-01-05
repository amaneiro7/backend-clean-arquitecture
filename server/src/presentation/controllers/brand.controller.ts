import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { successResponses } from '../../utils/successResponse'
import { getAllBrands } from '../../application/get-all/getAllBrands'
import { getBrandById } from '../../application/get/getBrandById'

export class BrandController {
  constructor (private readonly repository: Repository) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await getAllBrands(this.repository)
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

  getOne = async (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = await getBrandById({ id, repository: this.repository })
      successResponses.success({ res, data })
    } catch (error) {
      next(error)
    }
  }

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
