import { Router } from 'express'
import { RolesGetController } from '../controller/RolesGetController'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

interface Props {
  repository: Repository
}
export const createRolesRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new RolesGetController(repository)

  router.get('/', getController.getAll)

  return router
}
