export class DeviceSerial {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100
  static readonly notLowerCase = /^[^a-z]*$/
  static readonly notSpecialCharacterOnlyGuiones = /^[^\W_]*-?[^\W_]*$/
  static errors: string = ''
  constructor (readonly value: string) {
    if (!DeviceSerial.isValid(value)) {
      throw new Error(DeviceSerial.invalidMessage())
    }
  }

  private static updateError (error: string): void {
    DeviceSerial.errors = error
  }

  private static get errorsValue (): string {
    return DeviceSerial.errors
  }

  public static isValid (value: string): boolean {
    const errorMesagge: string[] = []
    const isHasNotSpecialCharacterOnlyGuiones = this.notSpecialCharacterOnlyGuiones.test(value)
    if (!isHasNotSpecialCharacterOnlyGuiones) {
      errorMesagge.push(`${value}: El Serial no puede contener caracteres especiales`)
    }
    const isNotHasLowerCharacter = this.notLowerCase.test(value)
    if (!isNotHasLowerCharacter) {
      errorMesagge.push("El Serial debe estar en mayúsculas")
    }
    const isNameValidLength = value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
    if (!isNameValidLength) {
      errorMesagge.push(`El Serial debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres`)
    }
    this.updateError(errorMesagge.join(' '))
    return isHasNotSpecialCharacterOnlyGuiones && isNotHasLowerCharacter && isNameValidLength
  }

  public static invalidMessage (): string {
    return this.errorsValue
  }
}
