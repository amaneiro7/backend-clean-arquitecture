import { type UpdateDevice, type CreateDevice, type DeviceOutput } from '../entities/Device/device.entity'
import { type GenericRepository } from './GenericRepository'

export interface DeviceRepository extends GenericRepository<DeviceOutput, CreateDevice, UpdateDevice> {}
