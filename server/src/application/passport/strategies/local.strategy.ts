import { Strategy } from 'passport-local'
import { localLogin } from '../../login/localLogin'
import { type Repository } from '../../../domain/repositories/respoitory'

const fieldOptions = {
  usernameField: 'email',
  passwordField: 'password'
}

export async function createLocalStrategy ({ repository }: { repository: Repository }): Promise<Strategy> {
  const LocalStrategy = new Strategy(fieldOptions, async (email: string, password: string, done) => {
    try {
      const token = await localLogin({ email, inputPassword: password, repository })
      done(null, token)
    } catch (error) {
      done(error, false)
    }
  })

  return LocalStrategy
}
