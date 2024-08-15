import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type Device } from './Device'
import { DeviceStatus } from './DeviceStatus'

export class DeviceStocknumber extends AcceptedNullValueObject<string> {
  private readonly NAME_MAX_LENGTH = 10
  private readonly NAME_MIN_LENGTH = 2

  constructor(
    readonly value: string | null,
    private readonly status: Primitives<DeviceStatus>
  ) {
    super(value)

    this.ensureIsValid(value, this.status)
  }

  toPrimitives(): string | null {
    return this.value
  }

  private ensureIsValid(value: Primitives<DeviceStocknumber>, status: Primitives<DeviceStatus>): void {
    if (value === null) return
    if (!(value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH)) {
      throw new InvalidArgumentError(`<${value}> exceeded the maximum length`)
    }
    if (status === DeviceStatus.StatusOptions.INUSE) {
      throw new InvalidArgumentError('The device cannot have a stock number if it is not in the warehouse')
    }
  }

  static async updateStockNumberField({ stockNumber, entity }: { stockNumber?: Primitives<DeviceStocknumber>, entity: Device }): Promise<void> {
    // Si no se ha pasado un nuevo valor de observacion no realiza ninguna acción
    if (stockNumber === undefined) {
      return
    }
    // Verifica que si el valor del campo observacion actual y el nuevo valor observacion son iguales no realiza un cambio
    if (entity.stockNumberValue === stockNumber) {
      return
    }

    const status = entity.statusValue
    // Actualiza el campo observacion de la entidad {@link Device} con el nuevo observacion
    entity.updateStockNumber(stockNumber, status)
  }
}
