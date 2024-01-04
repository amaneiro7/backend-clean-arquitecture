import { type UpdateDevice, type CreateDevice, type DeviceOutput } from '../entities/device.entity'
import { type Repository } from './repository'

export interface DeviceRepository extends Repository<DeviceOutput, CreateDevice, UpdateDevice> {}
