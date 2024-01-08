import { Router } from 'express'
import passport from 'passport'
import { UserController } from '../controllers/user.controller'
import { LoginStrategy } from '../../application/passport'
import { type Repository } from '../../domain/repositories/respoitory'

interface Props {
  repository: Repository
}

export const createProfileRouter = ({ repository }: Props): Router => {
  const router = Router()

  const userController = new UserController(repository)

  router.get('/my-profile',
    passport.authenticate(LoginStrategy.JWT, { session: false }),
    userController.getUser
  )

  router.patch(
    '/change-password',
    passport.authenticate(LoginStrategy.JWT, { session: false }),
    userController.changePassword
  )

  return router
}
