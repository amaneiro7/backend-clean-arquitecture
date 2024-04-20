import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemArqPrimitives } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArq'
import { OperatingSystemArqDoesNotExistError } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqDoesNotExist'
import { OperatingSystemArqId } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqID'
import { type OperatingSystemArqRepository } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqRepository'
import { type DeviceComputer } from './Computer'

import { type ComputerOperatingSystem } from './ComputerOperatingSystem'

export class ComputerOperatingSystemArq extends AcceptedNullValueObject<Primitives<OperatingSystemArqId>> {
  constructor (
    readonly value: Primitives<OperatingSystemArqId> | null,
    readonly operatingSystem: Primitives<ComputerOperatingSystem>
  ) {
    super(value)
    // this.nullIsCargoisHigherThanCoordinador(cargoId)
    this.ensureIfOperatingSystemIsNullOperatingSystemArqIsNullAsWell(this.value, this.operatingSystem)
    this.ensureIsValidOperatingSystemArqId(value)
  }

  toPrimitives (): Primitives<ComputerOperatingSystemArq> {
    return this.value
  }

  private ensureIsValidOperatingSystemArqId (id: Primitives<ComputerOperatingSystemArq>): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('Operating System Arquitecture is required')
    }
  }

  private ensureIfOperatingSystemIsNullOperatingSystemArqIsNullAsWell (operatingSystemArq: Primitives<ComputerOperatingSystemArq>, operatingSystem: Primitives<ComputerOperatingSystem>): void {
    if (operatingSystem === null && operatingSystemArq !== null) {
      throw new InvalidArgumentError('You cannot have operating system arquitecture without an operating system')
    }
    if (operatingSystem !== null && operatingSystemArq === null) {
      throw new InvalidArgumentError('You cannot have operating system without an operating system arquitecture')
    }
  }

  private isValid (id: Primitives<ComputerOperatingSystemArq>): boolean {
    if (id === null) return true
    const operatingSystemArqId = new OperatingSystemArqId(id)
    if (operatingSystemArqId instanceof OperatingSystemArqId) {
      return true
    }

    return false
  }

  static async updateOperatingSystemArqField ({ repository, operatingSystemArq, entity }: { repository: OperatingSystemArqRepository, operatingSystemArq?: Primitives<ComputerOperatingSystemArq>, entity: DeviceComputer }): Promise<void> {
    // Si no se ha pasado un nuevo valor del Sistema Operativo no realiza ninguna acción
    if (operatingSystemArq === undefined) {
      return
    }
    // Verifica que si el valor actual y el nuevo valor son iguales no realice ningún cambio
    if (entity.operatingSystemArqValue === operatingSystemArq) {
      return
    }
    // Verifica que el valor del Sistema Operativo exista en la base de datos, si no existe lanza un error {@link EmployeeDoesNotExistError} con el valor del Sistema Operativo pasado
    await ComputerOperatingSystemArq.ensureOperatingSystemArqExit({ repository, operatingSystemArq })
    // Actualiza el campo valor del Sistema Operativo de la entidad {@link Device} con el nuevo valor del Sistema Operativo
    const operatingSystem = entity.operatingSystemValue

    entity.updateOperatingSystemArq(operatingSystemArq, operatingSystem)
  }

  static async ensureOperatingSystemArqExit ({ repository, operatingSystemArq }: { repository: OperatingSystemArqRepository, operatingSystemArq: Primitives<ComputerOperatingSystemArq> }): Promise<void> {
    // If the valor del Sistema Operativo is null, it does not exist, so we don't need to do any verification
    if (operatingSystemArq === null) {
      return
    }
    // Searches for a device with the given valor del Sistema Operativo in the database
    const deviceWithOperatingSystemArq: OperatingSystemArqPrimitives | null = await repository.searchById(operatingSystemArq)
    // If a device with the given valor del Sistema Operativo exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given valor del Sistema Operativo
    if (deviceWithOperatingSystemArq === null) {
      throw new OperatingSystemArqDoesNotExistError(operatingSystemArq)
    }
  }
}
