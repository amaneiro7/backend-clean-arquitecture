/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { BrandGetController } from '../controller/Brand/BrandGetController'
import { type Repository } from '../../../../Contexts/Shared/domain/Repository'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createBrandRouter = ({ repository }: Props): Router => {
  const router = Router()
  const brandGetController = new BrandGetController(repository)
  router.get('/', brandGetController.getAll)
  router.get('/:id', brandGetController.getById)
  router.put('/')

  // router.patch(
  //   '/:id',
  //   validatorParamsHandler(getIdDTO),
  //   validatorBodyHandler(updateDTO),
  //   brandController.update
  // )
  return router
}
