export class UserLastName {
  static readonly NAME_MIN_LENGTH = 3
  static readonly NAME_MAX_LENGTH = 15

  constructor (readonly value: string) {
    if (!UserLastName.isValid(value)) {
      throw new Error(UserLastName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= UserLastName.NAME_MIN_LENGTH && value.length <= UserLastName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${UserLastName.NAME_MIN_LENGTH} y ${UserLastName.NAME_MAX_LENGTH} caracteres`
  }
}
