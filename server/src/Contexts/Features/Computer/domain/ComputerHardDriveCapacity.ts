import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { HardDriveCapacityId } from '../../HardDrive/HardDriveCapacity/domain/HardDriveCapacityId'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type HardDriveCapacityRepository } from '../../HardDrive/HardDriveCapacity/domain/HardDriveCapacityRepository'
import { type DeviceComputer } from './Computer'
import { DeviceStatus } from '../../../Device/Device/domain/DeviceStatus'

export class ComputerHardDriveCapacity extends AcceptedNullValueObject<Primitives<HardDriveCapacityId>> {
  constructor(
    readonly value: Primitives<HardDriveCapacityId> | null,
    readonly status: Primitives<DeviceStatus>
  ) {
    super(value)
    // this.nullIsCargoisHigherThanCoordinador(cargoId)
    this.ensureIsValidHardDriveCapacityId(value)
    this.ensureIfStatusIsInUseHardDriveMustHaveAValue(this.value, this.status)
  }

  toPrimitives(): Primitives<HardDriveCapacityId> | null {
    return this.value
  }

  private ensureIfStatusIsInUseHardDriveMustHaveAValue(hardDriveCapacity: Primitives<ComputerHardDriveCapacity>, status: Primitives<DeviceStatus>): void {
    if ([
      DeviceStatus.StatusOptions.INUSE,
      DeviceStatus.StatusOptions.PRESTAMO,
      DeviceStatus.StatusOptions.CONTINGENCIA,
      DeviceStatus.StatusOptions.GUARDIA
    ].includes(status) && hardDriveCapacity === null) {
      throw new InvalidArgumentError('If computer is in use, required an hard drive')
    }
  }

  private ensureIsValidHardDriveCapacityId(id: Primitives<HardDriveCapacityId> | null): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('HardDrive is required')
    }
  }

  private isValid(id: Primitives<HardDriveCapacityId> | null): boolean {
    if (id === null) return true
    const hardDriveCapacityId = new HardDriveCapacityId(id)
    if (hardDriveCapacityId instanceof HardDriveCapacityId) {
      return true
    }

    return false
  }

  static async updateHardDriveCapacityField({ repository, hardDriveCapacity, entity }: { repository: HardDriveCapacityRepository, hardDriveCapacity?: Primitives<ComputerHardDriveCapacity>, entity: DeviceComputer }): Promise<void> {
    // Si no se ha pasado un nuevo valor de la capacidad del Disco Duro no realiza ninguna acción
    if (hardDriveCapacity === undefined) {
      return
    }
    // Verifica que si el valor actual y el nuevo valor son iguales no realice ningún cambio
    if (entity.hardDriveCapacityValue === hardDriveCapacity) {
      return
    }
    // Verifica que el valor de la capacidad del Disco Duro exista en la base de datos, si no existe lanza un error {@link EmployeeDoesNotExistError} con el valor de la capacidad del Disco Duro pasado
    await HardDriveCapacityId.ensureHardDriveCapacityExit({ repository, hardDriveCapacity })
    const status = entity.statusValue
    // Actualiza el campo valor de la capacidad del Disco Duro de la entidad {@link Device} con el nuevo valor de la capacidad del Disco Duro
    entity.updateHardDriveCapacity(hardDriveCapacity, status)
  }
}
