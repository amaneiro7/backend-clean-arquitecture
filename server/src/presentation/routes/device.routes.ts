import { Router } from 'express'
import { deviceController } from '../../dependecies/device.dependecies'
import { createDeviceDTO, getIdDTO, updateDeviceDTO } from '../validators/dto'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import validatorBodyHandler from '../validators/validatorBodyHandler'

class DeviceRoutes {
  router = Router()

  constructor () {
    this.initializeRoutes()
  }

  initializeRoutes (): void {
    this.router.route('/').get(deviceController.getAll.bind(deviceController))
    this.router.route('/').post(
      validatorBodyHandler(createDeviceDTO),
      deviceController.create.bind(deviceController)
    )

    this.router.route('/:id').get(
      validatorParamsHandler(getIdDTO),
      deviceController.getOne.bind(deviceController)
    )

    this.router.route('/:id').patch(
      validatorParamsHandler(getIdDTO),
      validatorBodyHandler(updateDeviceDTO),
      deviceController.update.bind(deviceController)
    )
  }
}

export const deviceRouter = new DeviceRoutes().router
