import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { LocationGetController } from '../controller/LocationGetController'

interface Props {
  repository: Repository
}
export const createLocationRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new LocationGetController(repository)

  router.get('/all', getController.getAll)
  router.get('/', getController.getByCriteria)

  return router
}
