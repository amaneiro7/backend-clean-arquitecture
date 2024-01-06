import { Strategy } from 'passport-local'
import { localLogin } from '../../login/localLogin'
import { type Repository } from '../../../domain/repositories/respoitory'

const fieldOptions = {
  usernameField: 'email',
  passwordField: 'password'
}

interface Props {
  repository: Repository
}

export async function createLocalStrategy ({ repository }: Props): Promise<Strategy> {
  return new Strategy(fieldOptions, async (email: string, password: string, done) => {
    try {
      const token = await localLogin({ email, inputPassword: password, repository })
      done(null, token)
    } catch (error) {
      done(error, false)
    }
  })
}
