import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type StatusId } from '../../../devices/status/domain/StatusId'

export class ComputerName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (
    readonly value: string,
    readonly statusId: Primitives<StatusId>
  ) {
    if (value === null || value === undefined || value === '') {
      this.value = null
    } else {
      this.value = value
      if (!ComputerName.isValid(value)) {
        throw new Error(ComputerName.invalidMessage(value))
      }
    }
  }

  public static isValid (value: string | null): boolean {
    if (value === null || value === '') return true
    return value.length >= ComputerName.NAME_MIN_LENGTH && value.length <= ComputerName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${ComputerName.NAME_MIN_LENGTH} y ${ComputerName.NAME_MAX_LENGTH} caracteres`
  }
}
