import { type JwtPayload, verify } from 'jsonwebtoken'
import { config } from '../../../config/env.file'

export function verifyRefreshToken (refreshToken: string): string | JwtPayload {
  return verify(refreshToken, config.refreshTokenSecret)
}
