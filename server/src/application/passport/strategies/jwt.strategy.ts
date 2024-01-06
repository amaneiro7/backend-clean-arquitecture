import { ExtractJwt, Strategy } from 'passport-jwt'
import { config } from '../../../../config/env.file'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.accessTokenSecret
}

export const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
})

export const localPermision = {
  ADMIN: 'admin',
  PUBLIC: 'public',
  PRIVATE: 'private'
}
