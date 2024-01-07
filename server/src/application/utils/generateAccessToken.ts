import { type JwtPayload, sign } from 'jsonwebtoken'
import { type RolesValue } from '../../types/types'

export interface AuthJWTPayload extends JwtPayload {
  role?: RolesValue
}

export const enum ExpireTime {
  accessTokenDurantion = '15m',
  refreshTokenDurantion = '5h'
}

interface Props {
  payload: AuthJWTPayload
  accessTokenDuration: ExpireTime
  secret: string
}

export function generateAccessToken ({ payload, accessTokenDuration, secret }: Props): string {
  return sign(payload, secret, { expiresIn: accessTokenDuration })
}
