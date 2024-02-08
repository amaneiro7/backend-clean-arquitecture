import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { HardDriveTypeGetController } from '../controller/HardDriveTypeGetController'

// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createHardDriveTypeRouter = ({ repository }: Props): Router => {
  const router = Router()
  const hardDriveTypeGetController = new HardDriveTypeGetController(repository)

  router.get('/', hardDriveTypeGetController.getAll)

  return router
}
