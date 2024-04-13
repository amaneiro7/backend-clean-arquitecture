import { NumberValueObject } from '../../../shared/domain/value-object/NumberValueObject'

export class Cedula extends NumberValueObject {
  static readonly MAX = 200000000
  static readonly MIN = 1
  constructor (readonly value: number) {
    super(value)
  }

  public static isValid (value: number): boolean {
    return (value % 2) === 0 && value >= Cedula.MIN && value <= Cedula.MAX
  }

  public static invalidMessage (value: number): string {
    return `${value} no es una cédula válida`
  }
}
