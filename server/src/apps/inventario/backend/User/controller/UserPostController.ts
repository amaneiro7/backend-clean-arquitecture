import httpStatus from 'http-status'
import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

import { JwtPayloadUser } from '../../../../../Contexts/Auth/domain/GenerateToken'
import { ChangePassword } from '../../../../../Contexts/Auth/application/ChangePassword'

export class UserPostController {
  constructor(private readonly repository: Repository) { }

  changePaswword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as JwtPayloadUser
      const { password, newPassword, reTypePassword } = req.body
      await new ChangePassword(this.repository).run({
        payload: user,
        newPassword,
        password,
        reTypePassword
      })
      res.status(httpStatus.CREATED).json({ message: 'Contraseña actualizada exitosamente' })
    } catch (error) {
      next(error)
    }
  }
}
