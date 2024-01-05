import { type NextFunction, type Request, type Response } from 'express'
import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { type CreateBrand } from '../../domain/entities/brand.entity'
import { successResponses } from '../../utils/successResponse'
import { getAllBrands } from '../../application/get-all/getAllBrands'
import { getBrandById } from '../../application/get/getBrandById'
import { createNewBrand } from '../../application/create/createNewBrand'
import { updateBrand } from '../../application/update/updateBrand'

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

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.body as CreateBrand
      const newData = await createNewBrand({ payload, repository: this.repository })
      successResponses.created({ res, data: newData })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const payload = req.body
      const newData = await updateBrand({ id, payload, repository: this.repository })
      successResponses.created({ res, data: newData })
    } catch (error) {
      next(error)
    }
  }
}
