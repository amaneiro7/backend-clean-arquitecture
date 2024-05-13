import { Router } from 'express'
import { ModelSeriesGetController } from '../controller/ModelSeriesGetController'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { ModelSeriesPostController } from '../controller/ModelSeriesPostController'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createModelSeriesRouter = ({ repository }: Props): Router => {
  const router = Router()
  const modelSeriesGetController = new ModelSeriesGetController(repository)
  const modelSeriesPostController = new ModelSeriesPostController(repository)

  router.get('/', modelSeriesGetController.getByCriteria)
  router.get('/all', modelSeriesGetController.getAll)
  router.get('/:id', modelSeriesGetController.getById)
  router.post('/', modelSeriesPostController.create)
  router.patch('/:id', modelSeriesPostController.update)
  // router.patch(
  //   '/:id',
  //   validatorParamsHandler(getIdDTO),
  //   validatorBodyHandler(updateDTO),
  //   brandController.update
  // )
  return router
}
