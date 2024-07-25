import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { UserPostController } from '../controller/UserPostController'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createUserRouter = ({ repository }: Props): Router => {
  const router = Router()

  const postController = new UserPostController(repository)

  router.patch('/change-password', postController.changePaswword)
  // router.patch(
  //   '/:id',
  //   validatorParamsHandler(getIdDTO),
  //   validatorBodyHandler(updateDTO),
  //   brandController.update
  // )
  return router
}
