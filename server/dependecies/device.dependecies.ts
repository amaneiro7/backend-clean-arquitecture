import { DeviceService } from '../application/services/device.service'
import { DeviceRepositoryInMemory } from '../infrastructure/persistance/local-file-system/device'
import { DeviceController } from '../presentation/controllers/device.controller'

const deviceRepository = new DeviceRepositoryInMemory()

export const devicesService = new DeviceService(deviceRepository)

export const deviceController = new DeviceController(devicesService)
