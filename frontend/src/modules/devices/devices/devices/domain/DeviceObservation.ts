export class DeviceObservation {
  static readonly NAME_MIN_LENGTH = 0
  static readonly NAME_MAX_LENGTH = 1000

  constructor (readonly value: string | null | undefined) {
    if (value === null || value === undefined || value === '') {
      this.value = null
    } else {
      this.value = value

      if (!DeviceObservation.isValid(this.value)) {
        throw new Error(DeviceObservation.invalidMessage(value))
      }
    }
  }

  public static isValid (value: string | null): boolean {
    if (value === null || value === '') return true
    return value.length >= DeviceObservation.NAME_MIN_LENGTH && value.length <= DeviceObservation.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${DeviceObservation.NAME_MIN_LENGTH} y ${DeviceObservation.NAME_MAX_LENGTH} caracteres o dejarlo en blanco`
  }
}
