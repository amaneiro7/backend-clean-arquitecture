import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { GerenciaGetController } from '../controller/GerenciaGetController'

interface Props {
  repository: Repository
}
export const createGerenciaRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new GerenciaGetController(repository)

  router.get('/', getController.getAll)

  return router
}
