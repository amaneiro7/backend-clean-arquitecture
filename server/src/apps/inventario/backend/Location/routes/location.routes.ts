import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { LocationGetController } from '../controller/LocationGetController'
import { LocationPostController } from '../controller/LocationPostController'

interface Props {
  repository: Repository
}
export const createLocationRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new LocationGetController(repository)
  const postController = new LocationPostController(repository)

  router.get('/all', getController.getAll)
  router.get('/', getController.getByCriteria)
  router.post('/', postController.create)
  router.patch('/:id', postController.update)

  return router
}
