import { sign } from 'jsonwebtoken'
import { config } from '../../Shared/infrastructure/config'
import { type UserPrimitives } from '../../User/domain/User'

export interface Tokens {
  accessToken: string
  refreshToken: string
}

const accessTokenExpiresIn: string = '1h'
const refreshTokenExpiresIn: string = '7d'

export function generateTokens (payload: Omit<UserPrimitives, 'password'>): Tokens {
  const secret = config.accessTokenSecret
  const accessToken = sign(payload, secret, { expiresIn: accessTokenExpiresIn })
  const refreshToken = sign({ sub: payload.id }, secret, { expiresIn: refreshTokenExpiresIn })
  return { accessToken, refreshToken }
}
