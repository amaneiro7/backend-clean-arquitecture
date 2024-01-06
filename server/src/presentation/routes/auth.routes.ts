import { Router } from 'express'
import passport from 'passport'
import { LoginStrategy } from '../../application/passport'
import { AuthController } from '../controllers/auth.controller'

export const createAuthRouter = (): Router => {
  const router = Router()
  const authController = new AuthController()

  router.post('/login/local',
    passport.authenticate(LoginStrategy.LOCAL, { session: false }),
    authController.loginLocal
  )

  return router
}
