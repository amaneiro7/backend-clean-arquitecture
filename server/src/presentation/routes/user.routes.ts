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

// class UserRoutes {
//   router = Router()

//   constructor () {
//     this.initializeRoutes()
//   }

//   initializeRoutes (): void {
//     this.router.route('/').post(
//       validatorBodyHandler(createUserDTO),
//       userCreateController.create.bind(userCreateController)
//     )
//   }
// }

// export const userRouter = new UserRoutes().router
