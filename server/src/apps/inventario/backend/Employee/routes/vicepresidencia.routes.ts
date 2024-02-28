import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { VicepresidenciaGetController } from '../controller/VicepresidenciaGetController'

interface Props {
  repository: Repository
}
export const createVicepresidenciaRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new VicepresidenciaGetController(repository)

  router.get('/', getController.getAll)

  return router
}
