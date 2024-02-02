export interface Device {
  id: string
  serial: string
  activo: string
  statusId: number
  modelId: string
}

export interface DeviceCreate extends Omit<Device, 'id'> {}

export interface DeviceUpdate extends Partial<DeviceCreate> {}
