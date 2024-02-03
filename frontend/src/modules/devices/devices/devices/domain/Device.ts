export class Device {
  constructor (
    private readonly id: string,
    private readonly serial: string,
    private readonly activo: string,
    private readonly statusId: number,
    private readonly modelId: string
  ) {}
}

export interface DeviceCreate extends Omit<Device, 'id'> {}

export interface DeviceUpdate extends Partial<DeviceCreate> {}
