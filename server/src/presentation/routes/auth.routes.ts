import { Router } from 'express'
import passport from 'passport'
import { LoginStrategy } from '../../application/passport'
import { AuthController } from '../controllers/auth.controller'
import { type Repository } from '../../domain/repositories/respoitory'
import { type EmailAdapter } from '../../domain/adapters/email.adapter'

interface Props {
  repository: Repository
  emailAdapter: EmailAdapter
}

export const createAuthRouter = ({ repository, emailAdapter }: Props): Router => {
  const router = Router()
  const authController = new AuthController(repository, emailAdapter)

  router.post('/login/local',
    passport.authenticate(LoginStrategy.LOCAL, { session: false }),
    authController.loginLocal
  )

  router.post('/recovery', authController.sendRecovery)

  return router
}
