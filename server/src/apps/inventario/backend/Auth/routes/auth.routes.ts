import { Router } from 'express'
import passport from 'passport'
import { Strategy } from '../../../../../Contexts/User/infrastructure/auth/passport'

// import { validatorHandler } from '../../middleware/validatorHandler'

export const createAuthRouter = (): Router => {
  const router = Router()
  // const brandGetController = new BrandGetController(repository)
  // const brandPostController = new BrandPostController(repository)

  router.post('/login/local',
    passport.authenticate(Strategy.LOCAL, { session: false }),
    loginLocal
  )

  // router.patch(
  //   '/:id',
  //   validatorParamsHandler(getIdDTO),
  //   validatorBodyHandler(updateDTO),
  //   brandController.update
  // )
  return router
}
