import { AcceptedNullValueObject } from '../../../../shared/domain/value-object/AcceptedNullValueObjects'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { StatusId } from '../../../devices/status/domain/StatusId'
import { type HardDriveCapacityId } from '../../hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'

export class ComputerHDDCapacity extends AcceptedNullValueObject<Primitives<HardDriveCapacityId>> {
  private static errors: string = ''
  constructor (
    readonly value: Primitives<HardDriveCapacityId>,
    private readonly status: Primitives<StatusId>
  ) {
    super(value)
    if (value === null || value === undefined || value === '') {
      this.value = null
    } else {
      this.value = value
    }

    if (!ComputerHDDCapacity.isValid(this.value, this.status)) {
      throw new Error(ComputerHDDCapacity.invalidMessage())
    }
  }

  private static updateError (error: string): void {
    ComputerHDDCapacity.errors = error
  }

  private static get errorsValue (): string {
    return ComputerHDDCapacity.errors
  }

  public static isValid (value: Primitives<ComputerHDDCapacity>, status: Primitives<StatusId>): boolean {
    if (status === StatusId.StatusOptions.INUSE && value === null) {
      ComputerHDDCapacity.updateError('Si el equipo está en uso, no se puede dejar en blanco la capacidad del Disco Duro')
      return false
    }
    return true
  }

  public static invalidMessage (): string {
    return ComputerHDDCapacity.errorsValue
  }
}
