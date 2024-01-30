import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { ProcessorGetController } from '../controller/ProcessorGetController'
import { ProcessorPostController } from '../controller/ProcessorPostController'

// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createProcessorRouter = ({ repository }: Props): Router => {
  const router = Router()
  const processorGetController = new ProcessorGetController(repository)
  const processorPostController = new ProcessorPostController(repository)

  router.get('/', processorGetController.getAll)
  router.get('/:id', processorGetController.getById)
  router.post('/', processorPostController.create)
  router.patch('/:id', processorPostController.update)

  return router
}
