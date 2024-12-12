import passport from 'passport'
import { jwtBearerStrategy } from './strategies/jwt-bearer.strategy'
import { jwtCookieStrategy } from './strategies/jwt-cookie.strategy'
import { createLocalStrategy } from './strategies/local.strategy'
import { type Repository } from '../../../../../Shared/domain/Repository'

export async function createPassportInstance({ repository }: { repository: Repository }): Promise<passport.PassportStatic> {
  passport.use(await createLocalStrategy({ repository }))
  passport.use(jwtBearerStrategy)

  return passport
}

export const Strategy = {
  LOCAL: 'local',
  JWT: 'jwt',
} as const
