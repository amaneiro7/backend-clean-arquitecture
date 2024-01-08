import { badRequest } from '@hapi/boom'
import { type UserOutput } from '../../domain/entities/UserAggreagtion/user.entity'
import { type SignTokenResult } from '../../types/types'
import { config } from '../../../config/env.file'
import { ExpireTime, generateAccessToken } from '../utils/generateAccessToken'
interface Props {
  user: UserOutput
}
export function signToken ({ user }: Props): SignTokenResult {
  if (user === undefined) {
    throw badRequest()
  }

  const payload = {
    sub: user.id,
    role: user.role
  }

  const accessToken = generateAccessToken({
    payload,
    accessTokenDuration: ExpireTime.accessTokenDurantion,
    secret: config.accessTokenSecret
  }
  )
  const refreshToken = generateAccessToken({
    payload,
    accessTokenDuration: ExpireTime.refreshTokenDurantion,
    secret: config.refreshTokenSecret
  }
  )

  return {
    user,
    access_token: accessToken,
    refresh_token: refreshToken
  }
}
