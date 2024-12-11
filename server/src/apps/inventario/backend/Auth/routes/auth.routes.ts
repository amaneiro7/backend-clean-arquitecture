import { Router } from 'express'
import passport from 'passport'
import { Strategy } from '../../../../../Contexts/User/user/infrastructure/auth/passport'
import { AuthPostController } from '../controller/AuthPostController'
import { deleteTokenHttpOnly } from '../../Shared/Middleware/deleteTokenHttpOnly'

export const createAuthRouter = (): Router => {
  const router = Router()
  const authPostController = new AuthPostController()

  router.post('/login/local',
    passport.authenticate(Strategy.LOCAL, { session: false }),
    authPostController.loginLocal
  )

  router.post('/refresh-token',
    passport.authenticate(Strategy.LOCAL, { session: false }),
    authPostController.refreshToken
  )

  router.delete('/logout',
    deleteTokenHttpOnly
  )
  return router
}
