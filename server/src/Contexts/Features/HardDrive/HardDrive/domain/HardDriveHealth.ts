import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../Shared/domain/value-object/NumberValueObject'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type DeviceHardDrive } from './HardDrive'

export class HardDriveHealth extends NumberValueObject {
  private readonly MAX_HEALTH_VALUE = 100
  private readonly MIN_HEALTH_VALUE = 0

  constructor (readonly value: number) {
    super(value)

    this.ensureIsValidRange(value)
  }

  toPrimitives (): number {
    return this.value
  }

  private ensureIsValidRange (value: number): void {
    if (this.isHardDriveHealthValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  private isHardDriveHealthValid (value: number): boolean {
    return value < this.MIN_HEALTH_VALUE && value < this.MAX_HEALTH_VALUE
  }

  static async updateHealthField ({ health, entity }: { health?: Primitives<HardDriveHealth>, entity: DeviceHardDrive }): Promise<void> {
    // Si no se ha pasado un nuevo valor de la salud del Disco duro no realiza ninguna acción
    if (health === undefined) {
      return
    }
    // Verifica que si el valor del campo la salud del Disco duro actual y el nuevo valor la salud del Disco duro son iguales no realiza un cambio
    if (entity.healthValue === health) {
      return
    }
    // Actualiza el campo la salud del Disco duro de la entidad {@link Device} con el nuevo la salud del Disco duro
    entity.updateHealth(health)
  }
}
