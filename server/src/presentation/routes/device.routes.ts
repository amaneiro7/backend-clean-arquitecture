import { Router } from 'express'
import { type Repository } from '../../domain/repositories/respoitory'
import { createDeviceDTO, getIdDTO, updateDeviceDTO } from '../validators/dto'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { DeviceController } from '../controllers/device.controller'

interface Props {
  repository: Repository
}

export const createDeviceRouter = ({ repository }: Props): Router => {
  const router = Router()

  const deviceController = new DeviceController(repository)

  router.get('/', deviceController.getAll)
  router.post('/',
    validatorBodyHandler(createDeviceDTO),
    deviceController.create
  )

  router.get('/:id',
    validatorParamsHandler(getIdDTO),
    deviceController.getOne
  )
  router.patch('/:id',
    validatorParamsHandler(getIdDTO),
    validatorBodyHandler(updateDeviceDTO),
    deviceController.update
  )

  return router
}
