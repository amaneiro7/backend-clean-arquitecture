import { type Request, type Response, type NextFunction } from 'express'
import { type AnySchema, isError } from 'joi'
import { type Id } from '../../types/types'

class ValidatorParamsHandler {
  validateBody (schema: AnySchema) {
    return async (req: Request<{ id: Id }>, res: Response, next: NextFunction) => {
      try {
        const val = await schema.validateAsync(req.params)
        req.params.id = req.params.id ?? val
        next()
      } catch (error) {
        if (isError(error)) { res.status(400).json({ error: error.message }) }
      }
    }
  }
}

export const validatorParamsHandler = new ValidatorParamsHandler().validateBody
