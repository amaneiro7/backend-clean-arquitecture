import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { SiteCreator } from '../../../../../Contexts/Location/Site/application/SiteCreator'
import { SiteUpdater } from '../../../../../Contexts/Location/Site/application/SiteUpdater'


export class SitePostController {
  constructor(private readonly repository: Repository) { }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await new SiteCreator(this.repository).run(req.body)
      res.status(httpStatus.CREATED).json({ message: 'Sitio creado exitosamente' })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await new SiteUpdater(this.repository).run({ id, params: req.body })
      res.status(httpStatus.CREATED).json({ message: 'Sitio actualizado exitosamente' })
    } catch (error) {
      next(error)
    }
  }
}
