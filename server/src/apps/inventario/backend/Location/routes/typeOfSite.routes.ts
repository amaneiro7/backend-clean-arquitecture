import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { TypeOfSiteGetController } from '../controller/TypeOfSiteGetController'

interface Props {
  repository: Repository
}
export const createTypeOfSiteRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new TypeOfSiteGetController(repository)

  router.get('/', getController.getAll)

  return router
}
