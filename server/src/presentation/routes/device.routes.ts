import { Router } from 'express'
import { deviceController } from '../../dependecies/device.dependecies'
import { validatorHandler } from '../../middleware/validatorHandler'
import { createDeviceDTO } from '../dto/dto'

export const deviceRouter = Router()

deviceRouter.get('/', deviceController.getAll.bind(deviceController))
deviceRouter.post('/',
  validatorHandler({ schema: createDeviceDTO, property: 'body' }),
  deviceController.create.bind(deviceController))

deviceRouter.get('/:id', deviceController.getOne.bind(deviceController))
deviceRouter.patch('/:id', deviceController.update.bind(deviceController))
