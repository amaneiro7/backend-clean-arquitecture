import { sign, type JwtPayload } from 'jsonwebtoken'
import { config } from '../../Shared/infrastructure/config'
import { type UserPrimitives } from '../../User/domain/User'

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface JwtPayloadUser extends JwtPayload {
  email: string
  role: string
}

const accessTokenExpiresIn: string = '1h'
const refreshTokenExpiresIn: string = '7d'

export function generateTokens (user: Pick<UserPrimitives, 'id' | 'email' | 'role'>): string {
  const { id, email, role } = user
  const token: JwtPayloadUser = {
    sub: id,
    email,
    role,
    iss: 'SoporteTecnicoBNC'
  }
  const secret = config.accessTokenSecret
  const accessToken = sign(token, secret, { expiresIn: accessTokenExpiresIn })
  // const refreshToken = sign(token, secret, { expiresIn: refreshTokenExpiresIn })
  return accessToken
}
