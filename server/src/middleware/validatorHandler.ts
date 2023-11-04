import { type NextFunction, type Request, type Response } from 'express'
import { type AnySchema } from 'joi'

interface Props {
  schema: AnySchema
  property: 'body' | 'params'
}

export function validatorHandler ({ schema, property }: Props) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error != null) {
      next(new Error('Bad Request'))
    }
    next()
  }
}
