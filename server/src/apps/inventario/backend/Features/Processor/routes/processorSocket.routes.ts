import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { ProcessorSocketGetController } from '../controller/ProcessorSocketGetController'

interface Props {
  repository: Repository
}
export const createProcessorSocketRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new ProcessorSocketGetController(repository)

  router.get('/', getController.getAll)

  return router
}
