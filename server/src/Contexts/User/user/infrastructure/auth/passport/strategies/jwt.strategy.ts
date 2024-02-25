import { ExtractJwt, Strategy, type StrategyOptions } from 'passport-jwt'
import { config } from '../../../../../../Shared/infrastructure/config'
import { type Request } from 'express'

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
    return request?.cookies?.accessToken
  }
  ]),
  secretOrKey: config.accessTokenSecret
}

export const jwtStrategy = new Strategy(jwtOptions, (jwtPayload, done) => {
  done(null, jwtPayload)
})
// This is the middleware that will be used to protect routes. If a request is made
