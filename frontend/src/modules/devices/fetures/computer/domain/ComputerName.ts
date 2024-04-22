import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { StatusId } from '../../../devices/status/domain/StatusId'

export class ComputerName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100
  private static errors: string = ''

  constructor (
    readonly value: string,
    readonly status: Primitives<StatusId>
  ) {
    if (value === null || value === undefined || value === '') {
      this.value = null
    } else {
      this.value = value
      if (!ComputerName.isValid(this.value, this.status)) {
        throw new Error(ComputerName.invalidMessage())
      }
    }
  }

  private static updateError (error: string): void {
    ComputerName.errors = error
  }

  private static get errorsValue (): string {
    return ComputerName.errors
  }

  public static isValid (value: Primitives<ComputerName>, status: Primitives<StatusId>): boolean {
    if (status === '') return true
    if (StatusId.StatusOptions.INUSE === status && value === null) {
      ComputerName.updateError('El nombre de equipo no puede estar en blanco si el equipo esta en uso')
      return false
    }
    if (StatusId.StatusOptions.INUSE !== status && value !== null) {
      ComputerName.updateError('Si el equipo no está en uso, el nombre de equipo debe quedar en blanco')
      return false
    }
    if (value === null || value === '') return true
    return value.length >= ComputerName.NAME_MIN_LENGTH && value.length <= ComputerName.NAME_MAX_LENGTH
  }

  public static invalidMessage (): string {
    return ComputerName.errorsValue
  }
}
