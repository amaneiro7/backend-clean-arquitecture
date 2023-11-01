import { Router } from 'express'
import { deviceController } from '../../dependecies/device.dependecies'

export const deviceRouter = Router()

deviceRouter.get('/', deviceController.getAll.bind(deviceController))
deviceRouter.post('/', deviceController.create.bind(deviceController))

deviceRouter.get('/:id', deviceController.getOne.bind(deviceController))
deviceRouter.patch('/:id', deviceController.update.bind(deviceController))
