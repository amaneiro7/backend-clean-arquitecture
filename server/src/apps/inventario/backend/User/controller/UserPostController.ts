import httpStatus from 'http-status'
import { type NextFunction, type Request, type Response } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

import { JwtPayloadUser } from '../../../../../Contexts/Auth/domain/GenerateToken'
import { ChangePassword } from '../../../../../Contexts/Auth/application/ChangePassword'
import { UserResetPassword } from '../../../../../Contexts/User/user/application/UserResetPassword'
import { UserRegister } from '../../../../../Contexts/User/user/application/UserRegister'
import { UserUpdater } from '../../../../../Contexts/User/user/application/UserUpdater'

export class UserPostController {
  constructor(private readonly repository: Repository) { }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as JwtPayloadUser
      const params = req.body
      await new UserRegister(this.repository).register({ params, user })
      res.status(httpStatus.CREATED).json({ message: 'Usuario registrado exitosamente' })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as JwtPayloadUser
      const { email, payload } = req.body
      await new UserUpdater(this.repository).run({
        user,
        email,
        payload
      })
      res.status(httpStatus.CREATED).json({ message: 'Usuario actualizado exitosamente' })
    } catch (error) {
      next(error)
    }
  }

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

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as JwtPayloadUser
      const { email } = req.body
      await new UserResetPassword(this.repository).reset({
        user,
        email
      })
      res.status(httpStatus.CREATED).json({ message: 'Se ha restablecido la contraseña con éxito' })
    } catch (error) {
      next(error)
    }
  }
}
