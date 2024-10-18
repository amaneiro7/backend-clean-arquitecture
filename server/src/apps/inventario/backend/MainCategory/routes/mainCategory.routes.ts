import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { MainCategoryGetController } from '../controller/MainCategoryGetController'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createMainCategoryRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new MainCategoryGetController(repository)

  router.get('/', getController.getAll)
  router.get('/:id', getController.getById)

  return router
}
