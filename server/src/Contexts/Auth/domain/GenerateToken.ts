import { sign, type JwtPayload } from 'jsonwebtoken'
import { config } from '../../Shared/infrastructure/config'
import { type UserPrimitives } from '../../User/user/domain/User'

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface JwtPayloadUser extends JwtPayload {
  email: string
  roleId: number
}

const accessTokenExpiresIn: string = '10h'
const refreshTokenExpiresIn: string = '7d'

export function generateTokens (user: Pick<UserPrimitives, 'id' | 'email' | 'roleId'>): string[] {
  const { id, email, roleId } = user
  const token: JwtPayloadUser = {
    sub: id,
    email,
    roleId,
    iss: 'SoporteTecnicoBNC'
  }
  const secret = config.accessTokenSecret
  const accessToken = sign(token, secret, { expiresIn: accessTokenExpiresIn })
  const refreshToken = sign(token, secret, { expiresIn: refreshTokenExpiresIn })
  return [accessToken, refreshToken]
}
