import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { InputTypeGetController } from '../controller/InputTypeGetController'

interface Props {
  repository: Repository
}
export const createInputTypeRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new InputTypeGetController(repository)

  router.get('/', getController.getAll)

  return router
}
