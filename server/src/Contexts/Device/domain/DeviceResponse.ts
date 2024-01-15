interface IDeviceResponse {
  deviceId: string
  serial: string
  activo: string
  status: string
  modelId: string
}
export class DevicesResponse {
  constructor (readonly devices: IDeviceResponse) {}
}
