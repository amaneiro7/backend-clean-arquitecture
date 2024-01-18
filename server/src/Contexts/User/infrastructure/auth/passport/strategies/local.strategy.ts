import { Strategy } from 'passport-local'
import { type Repository } from '../../../../../Shared/domain/Repository'

export async function createLocalStrategy ({ repository }: { repository: Repository }): Promise<Strategy> {
  return new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email: string, password: string, done) => {
    try {
      const user = await repository.user.({ email, inputPassword: password, repository })
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  })
}
