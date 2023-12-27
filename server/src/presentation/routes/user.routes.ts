import { Router } from 'express'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { userCreateController } from '../controllers/createUser.controller'
import { createUserDTO } from '../validators/dto'

class UserRoutes {
  router = Router()

  constructor () {
    this.initializeRoutes()
  }

  initializeRoutes (): void {
    this.router.route('/').post(
      validatorBodyHandler(createUserDTO),
      userCreateController.create.bind(userCreateController)
    )
  }
}

export const userRouter = new UserRoutes().router
