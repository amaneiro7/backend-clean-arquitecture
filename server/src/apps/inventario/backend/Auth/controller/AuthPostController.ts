import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'

import { type UserPrimitives } from '../../../../../Contexts/User/user/domain/User'
import { generateTokens } from '../../../../../Contexts/Auth/domain/GenerateToken'
import { SendUserWithoutPassowrd } from '../../../../../Contexts/Auth/domain/SendUserWithoutPassword'


export class AuthPostController {
  loginLocal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as UserPrimitives
      if (user === undefined) throw new Error('User not found')
      const [accessToken, refreshToken] = generateTokens(user)
      const infoUser = SendUserWithoutPassowrd(user, refreshToken)
      res
        .status(httpStatus.OK)
        .cookie('accessToken', accessToken, { httpOnly: true })
        .json({ ...infoUser, message: 'Usuario logeado exitosamente' })
    } catch (error) {
      next(error)
    }
  }
}
