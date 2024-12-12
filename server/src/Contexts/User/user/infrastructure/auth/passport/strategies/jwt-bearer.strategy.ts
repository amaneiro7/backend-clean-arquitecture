import { ExtractJwt, Strategy } from 'passport-jwt'
import { config } from '../../../../../../../../config/env.file'

export const jwtBearerStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.accessTokenSecret
}, (jwtPayload, done) => {
  done(null, jwtPayload)
})
// This is the middleware that will be used to protect routes. If a request is made
