import { Strategy } from 'passport-local'
import { type Repository } from '../../../../../Shared/domain/Repository'
import { UserLoginLocal } from '../../../../application/login/UserLoginLocal'

export async function createLocalStrategy ({ repository }: { repository: Repository }): Promise<Strategy> {
  return new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email: string, password: string, done) => {
    try {
      const user = await new UserLoginLocal(repository).run({ email, password })
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  })
}
