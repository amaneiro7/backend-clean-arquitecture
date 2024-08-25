import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { HardDriveTypeId } from '../../HardDrive/HardDriveType/domain/HardDriveTypeId'
import { type HardDriveTypeRepository } from '../../HardDrive/HardDriveType/domain/HardDriveTypeRepository'

import { type DeviceComputer } from './Computer'
import { type ComputerHardDriveCapacity } from './ComputerHardDriveCapacity'

export class ComputerHardDriveType extends AcceptedNullValueObject<Primitives<HardDriveTypeId>> {
  constructor(
    readonly value: Primitives<HardDriveTypeId> | null,
    readonly hardDriveCapacity: Primitives<ComputerHardDriveCapacity>
  ) {
    super(value)
    // this.nullIsCargoisHigherThanCoordinador(cargoId)
    this.ensureIfHardDriveisNullHardDriveTypeIsNullAsWell(this.value, this.hardDriveCapacity)
    this.ensureIsValidHardDriveTypeId(value)
  }

  toPrimitives(): Primitives<HardDriveTypeId> | null {
    return this.value
  }

  private ensureIsValidHardDriveTypeId(id: Primitives<HardDriveTypeId> | null): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('EmployeeId is required')
    }
  }

  private ensureIfHardDriveisNullHardDriveTypeIsNullAsWell(hardDriveType: Primitives<ComputerHardDriveType>, hardDriveCapacity: Primitives<ComputerHardDriveCapacity>): void {
    if (hardDriveCapacity !== null && hardDriveType === null) {
      throw new InvalidArgumentError('HardDrive Type cannot have a value if hdd capacity is null')
    }
    if (hardDriveCapacity === null && hardDriveType !== null) {
      throw new InvalidArgumentError('Hard Drive type cannot be null if hdd capacity has a value')
    }
  }

  private isValid(id: Primitives<HardDriveTypeId> | null): boolean {
    if (id === null) return true
    const hardDriveTypeId = new HardDriveTypeId(id)
    if (hardDriveTypeId instanceof HardDriveTypeId) {
      return true
    }

    return false
  }

  static async updateHardDriveTypeField({ repository, hardDriveType, entity }: { repository: HardDriveTypeRepository, hardDriveType?: Primitives<ComputerHardDriveType>, entity: DeviceComputer }): Promise<void> {
    // Si no se ha pasado un nuevo valor de la capacidad del Disco Duro no realiza ninguna acción
    if (hardDriveType === undefined) {
      return
    }
    // Verifica que si el valor actual y el nuevo valor son iguales no realice ningún cambio
    if (entity.hardDriveTypeValue === hardDriveType) {
      return
    }
    // Verifica que el valor de la capacidad del Disco Duro exista en la base de datos, si no existe lanza un error {@link EmployeeDoesNotExistError} con el valor de la capacidad del Disco Duro pasado
    await HardDriveTypeId.ensureHardDriveTypeExit({ repository, hardDriveType })
    // Actualiza el campo valor de la capacidad del Disco Duro de la entidad {@link Device} con el nuevo valor de la capacidad del Disco Duro
    const hardDriveCapacity = entity.hardDriveCapacityValue
    entity.updateHardDriveType(hardDriveType, hardDriveCapacity)
  }
}
