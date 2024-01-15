import { Router } from 'express'
import passport from 'passport'
import { type Repository } from '../../../../Contexts/Shared/domain/Repository'

interface Props {
  repository: Repository
  // emailAdapter: EmailAdapter
}

export const createAuthRouter = ({ repository }: Props): Router => {
  const router = Router()
  const authController = new AuthController(repository)

  router.post('/login/local',
    passport.authenticate(LoginStrategy.LOCAL, { session: false }),
    authController.loginLocal
  )

  router.post('/recovery', authController.sendRecovery)

  return router
}
