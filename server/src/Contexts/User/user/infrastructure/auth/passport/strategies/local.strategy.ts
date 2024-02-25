import { Strategy } from 'passport-local'
import { type Repository } from '../../../../../../Shared/domain/Repository'
import { UserLoginLocal } from '../../../../../../Auth/application/login/UserLoginLocal'

export async function createLocalStrategy ({ repository }: { repository: Repository }): Promise<Strategy> {
  return new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email: string, intoPassword: string, done) => {
    try {
      const user = await new UserLoginLocal(repository).run({ email, intoPassword })
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  })
}
