import { type BrandService } from '../../application/services/brand.service'
import { type NextFunction, type Request, type Response } from 'express'

import { type Id } from '../../types/types'
import { type UpdateBrand, type CreateBrand } from '../../domain/entities/brand.entity'

export class BrandController {
  constructor (private readonly service: BrandService) {}

  async getAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.service.getAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  async getOne (req: Request<{ id: Id }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const data = await this.service.getOne({ id })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  async create (req: Request<{ payload: CreateBrand }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = req.body
      const newData = await this.service.create(payload)
      res.status(201).json(newData)
    } catch (error) {
      next(error)
    }
  }

  async update (req: Request<{ id: Id, payload: UpdateBrand }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const payload = req.body
      const newData = await this.service.update(id, payload)
      res.status(201).json(newData)
    } catch (error) {
      next(error)
    }
  }
}
