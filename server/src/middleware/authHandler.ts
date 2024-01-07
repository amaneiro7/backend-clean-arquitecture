import { unauthorized } from '@hapi/boom'
import { type Response, type NextFunction, type Request } from 'express'
import { type JwtPayload } from 'jsonwebtoken'
import { ROLE } from '../domain/entities/role.entity'

export function checkAdminRole (req: Request, res: Response, next: NextFunction): void {
  const user = req.user as JwtPayload
  if (req.user !== undefined && user?.role === ROLE.ADMIN) {
    next()
  } else {
    next(unauthorized('Acceso Denegado'))
  }
}
