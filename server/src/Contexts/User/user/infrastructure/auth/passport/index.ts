import passport from 'passport'
import { jwtStrategy } from './strategies/jwt.strategy'
import { createLocalStrategy } from './strategies/local.strategy'
import { type Repository } from '../../../../../Shared/domain/Repository'

export async function createPassportInstance ({ repository }: { repository: Repository }): Promise<passport.PassportStatic> {
  passport.use(await createLocalStrategy({ repository }))
  passport.use(jwtStrategy)

  return passport
}

export const Strategy = {
  LOCAL: 'local',
  JWT: 'jwt'
} as const
