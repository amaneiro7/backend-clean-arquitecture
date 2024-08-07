import { sign, type JwtPayload } from 'jsonwebtoken'
import { config } from '../../Shared/infrastructure/config'
import { type UserPrimitives } from '../../User/user/domain/User'
import { type Primitives } from '../../Shared/domain/value-object/Primitives'
import { type RoleId } from '../../User/Role/domain/RoleId'
import { type UserEmail } from '../../User/user/domain/UserEmail'

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface JwtPayloadUser extends JwtPayload {
  email: Primitives<UserEmail>
  roleId: Primitives<RoleId>
}

const accessTokenExpiresIn: string = '10h'
const refreshTokenExpiresIn: string = '7d'

export function generateTokens(user: Pick<UserPrimitives, 'id' | 'email' | 'roleId'>): string[] {
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
