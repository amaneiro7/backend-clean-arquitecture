import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { HardDriveCapacityGetController } from '../controller/HardDriveCapacityController'

// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createHardDriveCapacityRouter = ({ repository }: Props): Router => {
  const router = Router()

  const hardDriveCapacityGetController = new HardDriveCapacityGetController(repository)

  router.get('/', hardDriveCapacityGetController.getAll)

  return router
}
