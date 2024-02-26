import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { CityGetController } from '../controller/CityGetController'

interface Props {
  repository: Repository
}
export const createCityRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new CityGetController(repository)

  router.get('/', getController.getAll)

  return router
}
