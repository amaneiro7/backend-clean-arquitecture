import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { StateGetController } from '../controller/StateGetController'

interface Props {
  repository: Repository
}
export const createStateRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new StateGetController(repository)

  router.get('/', getController.getAll)

  return router
}
