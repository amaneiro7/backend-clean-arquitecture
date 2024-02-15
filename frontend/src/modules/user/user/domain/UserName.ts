export class UserName {
  static readonly NAME_MIN_LENGTH = 3
  static readonly NAME_MAX_LENGTH = 15

  constructor (readonly value: string) {
    if (!UserName.isValid(value)) {
      throw new Error(UserName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= UserName.NAME_MIN_LENGTH && value.length <= UserName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${UserName.NAME_MIN_LENGTH} y ${UserName.NAME_MAX_LENGTH} caracteres`
  }
}
