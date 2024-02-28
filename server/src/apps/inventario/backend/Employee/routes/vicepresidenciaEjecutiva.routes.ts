import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { VicepresidenciaEjecutivaGetController } from '../controller/VicepresidenciaEjecutivaGetController'

interface Props {
  repository: Repository
}
export const createVicepresidenciaEjecutivaRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new VicepresidenciaEjecutivaGetController(repository)

  router.get('/', getController.getAll)

  return router
}
