import { ExtractJwt, Strategy, type StrategyOptions } from 'passport-jwt'

import { type Request } from 'express'
import { config } from '../../../../../../../../config/env.file'

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
    console.log('jwt-Cookie.strategy', request?.cookies)
    return request?.cookies?.refreshToken
  }
  ]),
  secretOrKey: config.refreshTokenSecret
}

export const jwtCookieStrategy = new Strategy(jwtOptions, (jwtPayload, done) => {
  done(null, jwtPayload)
})
// This is the middleware that will be used to protect routes. If a request is made
