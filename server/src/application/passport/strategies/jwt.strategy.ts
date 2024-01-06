import { ExtractJwt, Strategy } from 'passport-jwt'
import { config } from '../../../../config/env.file'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.accessTokenSecret
}
export const jwtStrategy = new Strategy(options, (jwtPayload, done) => {
  done(null, jwtPayload)
})
// This is the middleware that will be used to protect routes. If a request is made
