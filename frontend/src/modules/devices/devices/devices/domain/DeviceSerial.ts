export class DeviceSerial {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!DeviceSerial.isValid(value)) {
      throw new Error(DeviceSerial.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= DeviceSerial.NAME_MIN_LENGTH && value.length <= DeviceSerial.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${DeviceSerial.NAME_MIN_LENGTH} y ${DeviceSerial.NAME_MAX_LENGTH} caracteres`
  }
}
