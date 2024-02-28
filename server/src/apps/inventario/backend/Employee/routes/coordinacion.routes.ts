import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { CoordinacionGetController } from '../controller/CoordinacionGetController'

interface Props {
  repository: Repository
}
export const createCoordinacionRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new CoordinacionGetController(repository)

  router.get('/', getController.getAll)

  return router
}
