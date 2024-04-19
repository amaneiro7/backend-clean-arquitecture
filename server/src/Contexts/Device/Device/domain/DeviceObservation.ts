import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type Device } from './Device'

export class DeviceObservation extends AcceptedNullValueObject<string> {
  private readonly NAME_MAX_LENGTH = 1000
  private readonly NAME_MIN_LENGTH = 0

  constructor (readonly value: string | null) {
    super(value)

    this.ensureIsValidActivo(value)
  }

  toPrimitives (): string | null {
    return this.value
  }

  private ensureIsValidActivo (value: string | null): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> exceeded the maximum length`)
    }
  }

  private isValid (name: string | null): boolean {
    if (name === null) return true
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }

  // TODO cambiar que observation no acepte null pero si string vacios
  static async updateObservationField ({ observation, entity }: { observation?: Primitives<DeviceObservation>, entity: Device }): Promise<void> {
    // Si no se ha pasado un nuevo valor de observacion no realiza ninguna acción
    if (observation === undefined) {
      return
    }
    // Verifica que si el valor del campo observacion actual y el nuevo valor observacion son iguales no realiza un cambio
    if (entity.observationValue === observation) {
      return
    }
    // Actualiza el campo observacion de la entidad {@link Device} con el nuevo observacion
    entity.updateObservation(observation)
  }
}
