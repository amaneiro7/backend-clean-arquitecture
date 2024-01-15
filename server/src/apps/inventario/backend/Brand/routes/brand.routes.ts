import { Router } from 'express'
import { BrandGetController } from '../controller/BrandGetController'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { BrandPostController } from '../controller/BrandPostController'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createBrandRouter = ({ repository }: Props): Router => {
  const router = Router()
  const brandGetController = new BrandGetController(repository)
  const brandPostController = new BrandPostController(repository)

  router.get('/', brandGetController.getAll)
  router.get('/:id', brandGetController.getById)
  router.post('/', brandPostController.create)
  router.patch('/:id', brandPostController.update)
  // router.patch(
  //   '/:id',
  //   validatorParamsHandler(getIdDTO),
  //   validatorBodyHandler(updateDTO),
  //   brandController.update
  // )
  return router
}
