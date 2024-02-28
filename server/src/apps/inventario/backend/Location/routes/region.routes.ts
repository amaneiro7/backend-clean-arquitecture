import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { RegionGetController } from '../controller/RegionGetController'

interface Props {
  repository: Repository
}
export const createRegionRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new RegionGetController(repository)

  router.get('/', getController.getAll)

  return router
}
