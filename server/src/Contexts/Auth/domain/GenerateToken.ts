import { sign, type JwtPayload } from 'jsonwebtoken'

import { type UserPrimitives } from '../../User/user/domain/User'
import { type Primitives } from '../../Shared/domain/value-object/Primitives'
import { type RoleId } from '../../User/Role/domain/RoleId'
import { type UserEmail } from '../../User/user/domain/UserEmail'
import { type UserId } from '../../User/user/domain/UserId'
import { config } from '../../../../config/env.file'

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface JwtPayloadUser extends JwtPayload {
  sub: Primitives<UserId>
  email: Primitives<UserEmail>
  roleId: Primitives<RoleId>
}

const accessTokenExpiresIn: string = '1m'
const refreshTokenExpiresIn: string = '1m'

export function generateAceessTokens(user: Pick<UserPrimitives, 'id' | 'email' | 'roleId'>): string {
  const { id, email, roleId } = user
  const token: JwtPayloadUser = {
    sub: id,
    email,
    roleId,
    iss: 'SoporteTecnicoBNC'
  }
  const secret = config.accessTokenSecret
  return sign(token, secret, { expiresIn: accessTokenExpiresIn })


}
export function generateRefreshToken(user: Pick<UserPrimitives, 'id' | 'email' | 'roleId'>): string {
  const { id, email, roleId } = user
  const token: JwtPayloadUser = {
    sub: id,
    email,
    roleId,
    iss: 'SoporteTecnicoBNC'
  }
  const secret = config.refreshTokenSecret

  return sign(token, secret, { expiresIn: refreshTokenExpiresIn })

}
