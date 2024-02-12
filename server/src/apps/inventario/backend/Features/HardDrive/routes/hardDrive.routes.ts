import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { HardDriveGetController } from '../controller/HardDriveGetController'

interface Props {
  repository: Repository
}
export const createHardDriveRouter = ({ repository }: Props): Router => {
  const router = Router()
  const hardDriveGetController = new HardDriveGetController(repository)

  router.get('/', hardDriveGetController.getAll)
  router.get('/:id', hardDriveGetController.getById)

  return router
}
