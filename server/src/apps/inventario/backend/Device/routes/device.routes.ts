import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { DeviceGetController } from '../controller/DeviceGetController'
import { DevicePostController } from '../controller/DevicePostController'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createDeviceRouter = ({ repository }: Props): Router => {
  const router = Router()
  const deviceGetController = new DeviceGetController(repository)
  const devicePostController = new DevicePostController(repository)

  router.get('/', deviceGetController.getAll)
  router.get('/:id', deviceGetController.getById)
  router.post('/', devicePostController.create)
  router.patch('/:id', devicePostController.update)
  // router.patch(
  //   '/:id',
  //   validatorParamsHandler(getIdDTO),
  //   validatorBodyHandler(updateDTO),
  //   brandController.update
  // )
  return router
}
