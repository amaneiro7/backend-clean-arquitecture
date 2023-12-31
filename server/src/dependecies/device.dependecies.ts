import { DeviceService } from '../application/services/device.service'
import { deviceRepositoryInMemory } from '../infrastructure/persistance/local-file-system/device'

export const devicesService = new DeviceService(deviceRepositoryInMemory)
