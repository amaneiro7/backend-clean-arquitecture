import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { UserPostController } from '../controller/UserPostController'
import { UserDeleteController } from '../controller/UserDeleteController'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createUserRouter = ({ repository }: Props): Router => {
  const router = Router()

  const postController = new UserPostController(repository)
  const deleteController = new UserDeleteController(repository)

  router.post('/register', postController.register)
  router.patch('/change-password', postController.changePaswword)
  router.patch('/update', postController.update)
  router.patch('/reset-password', postController.resetPassword)

  router.delete('/delete', deleteController.remove)
  // router.patch(
  //   '/:id',
  //   validatorParamsHandler(getIdDTO),
  //   validatorBodyHandler(updateDTO),
  //   brandController.update
  // )
  return router
}
