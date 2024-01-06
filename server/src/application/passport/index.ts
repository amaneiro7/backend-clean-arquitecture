import passport from 'passport'
import { jwtStrategy } from './strategies/jwt.strategy'
import { type Repository } from '../../domain/repositories/respoitory'
import { createLocalStrategy } from './strategies/local.strategy'

export async function createPassportInstance ({ repository }: { repository: Repository }): Promise<passport.PassportStatic> {
  passport.use(await createLocalStrategy({ repository }))
  passport.use(jwtStrategy)

  return passport
}

export const enum LoginStrategy {
  LOCAL = 'local',
  JWT = 'jwt'
}
