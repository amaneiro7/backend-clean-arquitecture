import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { SiteGetController } from '../controller/SiteGetController'
import { SitePostController } from '../controller/SitePostController'

interface Props {
  repository: Repository
}
export const createSiteRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new SiteGetController(repository)
  const postController = new SitePostController(repository)

  router.get('/', getController.getAll)
  router.post('/', postController.create)
  router.patch('/:id', postController.update)

  return router
}
