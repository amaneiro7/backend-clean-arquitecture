import { Router } from 'express'
import { StatusGetController } from '../controller/StatusGetController'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'

interface Props {
  repository: Repository
}
export const createStatusRouter = ({ repository }: Props): Router => {
  const router = Router()
  const statusGetController = new StatusGetController(repository)

  router.get('/', statusGetController.getAll)

  return router
}
