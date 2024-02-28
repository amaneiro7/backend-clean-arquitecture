import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { SiteGetController } from '../controller/SiteGetController'

interface Props {
  repository: Repository
}
export const createSiteRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new SiteGetController(repository)

  router.get('/', getController.getAll)

  return router
}
