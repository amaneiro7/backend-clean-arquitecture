import { CookieOptions, type NextFunction, type Request, type Response } from 'express'
import httpStatus from '../../Shared/utils/http-status'

import { type UserPrimitives } from '../../../../../Contexts/User/user/domain/User'
import { generateTokens } from '../../../../../Contexts/Auth/domain/GenerateToken'
import { SendUserWithoutPassowrd } from '../../../../../Contexts/Auth/domain/SendUserWithoutPassword'
import { whitelist } from '../../Shared/Middleware/whitelist'


export class AuthPostController {
  loginLocal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as UserPrimitives
      if (user === undefined) throw new Error('User not found')
      const [accessToken, refreshToken] = generateTokens(user)
      const infoUser = SendUserWithoutPassowrd(user, refreshToken)

      whitelist.forEach(domain => {
        this.setCookieForDomain(res, domain, 'refreshToken', accessToken)
      })
      res
        .status(httpStatus.OK)
        .cookie('accessToken', accessToken, { httpOnly: true, })
        .json({ ...infoUser, message: 'Usuario logeado exitosamente' })
    } catch (error) {
      next(error)
    }
  }

  private setCookieForDomain(res: Response, domain: string, cookieName: string, cookieValue: string): void {
    const commonOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      domain
    }
    res.cookie(cookieName, cookieValue, commonOptions)
  }
}
