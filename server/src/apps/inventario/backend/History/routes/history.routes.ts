import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { HistoryGetController } from '../controller/HistoryGetController'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createHistoryRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new HistoryGetController(repository)

  router.get('/', getController.getAll)

  return router
}
