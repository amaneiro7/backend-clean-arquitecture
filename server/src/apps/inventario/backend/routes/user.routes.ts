import { Router } from 'express'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { UserController } from '../controllers/user.controller'
import { createUserDTO } from '../validators/dto'
import { type Repository } from '../../domain/repositories/respoitory'
import { checkAccessRole } from '../middleware/authHandler'
import passport from 'passport'
import { LoginStrategy } from '../../application/passport'

interface Props {
  repository: Repository
}

export const createUserRouter = ({ repository }: Props): Router => {
  const router = Router()

  const userController = new UserController(repository)

  router.post(
    '/',
    passport.authenticate(LoginStrategy.JWT, { session: false }),
    checkAccessRole({ permission: 'full' }),
    validatorBodyHandler(createUserDTO),
    userController.create
  )

  return router
}
