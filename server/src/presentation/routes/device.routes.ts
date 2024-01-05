import { Router } from 'express'
import { type Repository } from '../../domain/repositories/respoitory'
import { createDeviceDTO, getIdDTO, updateDeviceDTO } from '../validators/dto'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { DeviceController } from '../controllers/device.controller'

export const createDeviceRouter = (repository: Repository): Router => {
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
    validatorParamsHandler(updateDeviceDTO),
    deviceController.update
  )

  return router
}
