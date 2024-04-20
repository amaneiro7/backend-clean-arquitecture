import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { type HardDriveCapacityRepository } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityRepository'
import { type DeviceComputer } from './Computer'

export class ComputerHardDriveCapacity extends AcceptedNullValueObject<Primitives<HardDriveCapacityId>> {
  constructor (
    readonly value: Primitives<HardDriveCapacityId> | null
  ) {
    super(value)
    // this.nullIsCargoisHigherThanCoordinador(cargoId)
    this.ensureIsValidHardDriveCapacityId(value)
  }

  toPrimitives (): Primitives<HardDriveCapacityId> | null {
    return this.value
  }

  private ensureIsValidHardDriveCapacityId (id: Primitives<HardDriveCapacityId> | null): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('HardDrive is required')
    }
  }

  private isValid (id: Primitives<HardDriveCapacityId> | null): boolean {
    if (id === null) return true
    const hardDriveCapacityId = new HardDriveCapacityId(id)
    if (hardDriveCapacityId instanceof HardDriveCapacityId) {
      return true
    }

    return false
  }

  static async updateHardDriveCapacityField ({ repository, hardDriveCapacity, entity }: { repository: HardDriveCapacityRepository, hardDriveCapacity?: Primitives<ComputerHardDriveCapacity>, entity: DeviceComputer }): Promise<void> {
    // Si no se ha pasado un nuevo valor de la capacidad del Disco Duro no realiza ninguna acción
    if (hardDriveCapacity === undefined) {
      return
    }
    // Verifica que si el valor actual y el nuevo valor son iguales no realice ningún cambio
    if (entity.employeeeValue === hardDriveCapacity) {
      return
    }
    // Verifica que el valor de la capacidad del Disco Duro exista en la base de datos, si no existe lanza un error {@link EmployeeDoesNotExistError} con el valor de la capacidad del Disco Duro pasado
    await HardDriveCapacityId.ensureHardDriveCapacityExit({ repository, hardDriveCapacity })
    // Actualiza el campo valor de la capacidad del Disco Duro de la entidad {@link Device} con el nuevo valor de la capacidad del Disco Duro
    entity.updateHardDriveCapacity(hardDriveCapacity)
  }
}
