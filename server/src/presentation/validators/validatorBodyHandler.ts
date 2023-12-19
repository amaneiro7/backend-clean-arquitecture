import { type Request, type Response, type NextFunction } from 'express'
import { type AnySchema, isError } from 'joi'

interface ValidatorBodyRequest extends Request {
  value?: { body?: string }
}

class ValidatorBodyHandler {
  validateBody (schema: AnySchema) {
    return async (req: ValidatorBodyRequest, res: Response, next: NextFunction) => {
      try {
        const val = await schema.validateAsync(req.body)
        req.value = req.value ?? {}
        req.value.body = req.value.body ?? val
        next()
      } catch (error) {
        if (isError(error)) {
          next(error)
        }
        next()
      }
    }
  }
}

export default new ValidatorBodyHandler().validateBody
