export class DeviceActivo {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string | null) {
    if (value === null || value === undefined || value === '') {
      this.value = null
    } else {
      this.value = value

      if (!DeviceActivo.isValid(this.value)) {
        throw new Error(DeviceActivo.invalidMessage(value))
      }
    }
  }

  public static isValid (value: string | null): boolean {
    if (value === null) return true
    return value.length >= DeviceActivo.NAME_MIN_LENGTH && value.length <= DeviceActivo.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${DeviceActivo.NAME_MIN_LENGTH} y ${DeviceActivo.NAME_MAX_LENGTH} caracteres`
  }
}
