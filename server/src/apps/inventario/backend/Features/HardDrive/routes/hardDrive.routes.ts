import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { HardDriveGetController } from '../controller/HardDriveGetController'
import { HardDrivePostController } from '../controller/HardDrivePostController'

interface Props {
  repository: Repository
}
export const createHardDriveRouter = ({ repository }: Props): Router => {
  const router = Router()
  const hardDriveGetController = new HardDriveGetController(repository)
  const hardDrivePostController = new HardDrivePostController(repository)

  router.get('/', hardDriveGetController.getAll)
  router.get('/:id', hardDriveGetController.getById)
  router.post('/', hardDrivePostController.create)
  router.patch('/:id', hardDrivePostController.update)

  return router
}
