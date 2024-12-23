import { CookieOptions, type NextFunction, type Request, type Response } from 'express'
import httpStatus from '../../Shared/utils/http-status'
import { config } from '../../../../../../config/env.file'

import { generateAceessTokens, generateRefreshToken } from '../../../../../Contexts/Auth/domain/GenerateToken'
import { SendUserWithoutPassowrd } from '../../../../../Contexts/Auth/domain/SendUserWithoutPassword'
import { whitelist } from '../../Shared/Middleware/whitelist'
import { validateToken } from '../../../../../Contexts/Auth/domain/VerifyToken'

import { type UserPrimitives } from '../../../../../Contexts/User/user/domain/User'
import { Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { UserId } from '../../../../../Contexts/User/user/domain/UserId'

export class AuthPostController {
  constructor(private readonly repository: Repository) { }

  loginLocal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as UserPrimitives
      if (user === undefined) throw new Error('User not found')
      const accessToken = generateAceessTokens(user)
      const refreshToken = generateRefreshToken(user)
      const infoUser = SendUserWithoutPassowrd(user, refreshToken)

      whitelist.forEach(domain => {
        this.setCookieForDomain(res, domain, 'refreshToken', accessToken)
      })
      res
        .status(httpStatus.OK)
        .cookie('accessToken', accessToken, { httpOnly: true, })
        .json({
          ...infoUser,
          message: 'Sesión iniciada exitosamente'
        })
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as UserPrimitives
      if (user === undefined) throw new Error('User not found')
      const accessToken = generateAceessTokens(user)
      const refreshToken = generateRefreshToken(user)
      const infoUser = SendUserWithoutPassowrd(user, accessToken)
      res
        .status(httpStatus.OK)
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .json({
          ...infoUser,
          message: 'Sesion iniciada exitosamente'
        })
    } catch (error) {
      next(error)
    }
  }

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshToken = req?.cookies?.refreshToken as string

      if (refreshToken === undefined) {
        res.sendStatus(httpStatus.FORBIDDEN)

      }

      const { email, roleId, sub: id } = validateToken(refreshToken, config.refreshTokenSecret)

      // Validar si el token de refresco pertenece al mismo usuario
      const user = await this.repository.user.searchById(new UserId(id).value)
      if (user === null) {
        throw new Error('User not found')
      }
      if (!user || user.email !== email || user.roleId !== roleId) {
        res.sendStatus(httpStatus.FORBIDDEN)
        return
      }

      const accessToken = generateAceessTokens({ email, roleId, id })
      const infoUser = SendUserWithoutPassowrd(user, accessToken)
      res.status(httpStatus.OK).json({
        ...infoUser,
        message: 'Token actualizado exitosamente'
      })
    } catch (error) {
      next(error)
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res
        .status(httpStatus.OK)
        .clearCookie('refreshToken')
        .clearCookie('accessToken')
        .json({ message: 'Sesion cerrada exitosamente' })
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
