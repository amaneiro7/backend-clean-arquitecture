import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { CategoryGetController } from '../controller/CategoryGetController'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createCategoryRouter = ({ repository }: Props): Router => {
  const router = Router()
  const categoryGetController = new CategoryGetController(repository)

  router.get('/', categoryGetController.getAll)
  router.get('/:id', categoryGetController.getById)

  return router
}
