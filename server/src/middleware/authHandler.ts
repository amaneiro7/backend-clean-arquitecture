import { unauthorized } from '@hapi/boom'
import { PERMISSION, RolePermission } from '../domain/entities/rolePermission'
import { type Response, type NextFunction, type Request } from 'express'
import { type PermissionValue } from '../types/types'
import { type JWTUserPayload } from '../domain/entities/user.entity'

export function checkAccessRole ({ permission }: { permission: PermissionValue }) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Se Obtiene el usuario del payload generado por passport-jwt
    const user = req.user as JWTUserPayload

    // Se obtienen los permisos que posee dicho usuario
    const userPermission = RolePermission[user?.role].slice()

    // Se valida si el usuario posee el permiso o si es administrador
    const isHasAccess = userPermission.includes(permission) || userPermission.includes(PERMISSION.FULL)

    if (isHasAccess) {
      next()
    } else {
      next(unauthorized('Acceso Denegado'))
    }
  }
}
