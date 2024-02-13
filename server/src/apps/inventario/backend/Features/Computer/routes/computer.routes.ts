import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { ComputerGetController } from '../controller/ComputerGetController'

interface Props {
  repository: Repository
}
export const createComputerRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new ComputerGetController(repository)

  router.get('/', getController.getAll)

  return router
}
