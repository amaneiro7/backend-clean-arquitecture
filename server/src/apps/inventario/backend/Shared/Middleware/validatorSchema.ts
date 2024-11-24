import { type Request, type Response, type NextFunction } from 'express'
import { type ValidationError, validationResult } from 'express-validator'
import httpStatus from '../../Shared/utils/http-status'

export function validateReqSchema(req: Request, res: Response, next: NextFunction): any {
  const validationErrors = validationResult(req)
  if (validationErrors.isEmpty()) {
    next(); return
  }
  const errors = validationErrors.array().map((err: ValidationError) => ({
    [err.type]: err.msg
  }))

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors
  })
}
