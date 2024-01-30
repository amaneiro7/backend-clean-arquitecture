import { type NextFunction, type Request, type Response } from 'express'
import { ProcessorCreator } from '../../../../../../Contexts/Features/Processor/application/ProcessorCreator'
import { ProcessorUpdater } from '../../../../../../Contexts/Features/Processor/application/ProcessorUpdater'
import httpStatus from 'http-status'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'

export class ProcessorPostController {
  constructor (private readonly repository: Repository) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.body
      await new ProcessorCreator(this.repository).run({ name })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.body
      const { id } = req.params
      await new ProcessorUpdater(this.repository).run({ id, newName: name })
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
