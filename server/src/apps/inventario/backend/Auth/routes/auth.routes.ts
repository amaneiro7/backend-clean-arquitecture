import { Router } from 'express'
import passport from 'passport'
import { Strategy } from '../../../../../Contexts/User/infrastructure/auth/passport'
import { AuthPostController } from '../controller/AuthPostController'

// import { validatorHandler } from '../../middleware/validatorHandler'

export const createAuthRouter = (): Router => {
  const router = Router()
  const authPostController = new AuthPostController()
  // const brandPostController = new BrandPostController(repository)

  router.post('/login/local',
    passport.authenticate(Strategy.LOCAL, { session: false }),
    authPostController.loginLocal
  )

  // router.patch(
  //   '/:id',
  //   validatorParamsHandler(getIdDTO),
  //   validatorBodyHandler(updateDTO),
  //   brandController.update
  // )
  return router
}