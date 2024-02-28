import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { CargoGetController } from '../controller/CargoGetController'

interface Props {
  repository: Repository
}
export const createCargoRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new CargoGetController(repository)

  router.get('/', getController.getAll)

  return router
}
