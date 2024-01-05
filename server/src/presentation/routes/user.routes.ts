import { Router } from 'express'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { UserCreateController } from '../controllers/createUser.controller'
import { createUserDTO } from '../validators/dto'
import { type Repository } from '../../domain/repositories/respoitory'

export const createUserRouter = (repository: Repository): Router => {
  const router = Router()

  const userController = new UserCreateController(repository)

  router.post(
    '/',
    validatorBodyHandler(createUserDTO),
    userController.create
  )

  return router
}
