import { Router } from 'express'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { UserCreateController } from '../controllers/createUser.controller'
import { createUserDTO } from '../validators/dto'
import { type Repository } from '../../domain/repositories/respoitory'
import { checkAccessRole } from '../../middleware/authHandler'

interface Props {
  repository: Repository
}

export const createUserRouter = ({ repository }: Props): Router => {
  const router = Router()

  const userController = new UserCreateController(repository)

  router.post(
    '/',
    validatorBodyHandler(createUserDTO),
    checkAccessRole({ permission: 'full' }),
    userController.create
  )

  return router
}
