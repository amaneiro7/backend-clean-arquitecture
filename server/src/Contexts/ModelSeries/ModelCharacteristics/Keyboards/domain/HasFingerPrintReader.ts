import { BooleanValueObject } from '../../../../Shared/domain/value-object/BooleanValueObject'
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { KeyboardModels } from './KeyboadModels'

export class HasFingerPrintReader extends BooleanValueObject {
  constructor(readonly value: boolean) {
    super(value)

    this.ensureIsValid(value)
  }

  toPrimitives(): boolean {
    return this.value
  }

  private ensureIsValid(value: boolean): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`This <${value}> is not a valid type`)
    }
  }

  private isValid(value: boolean): boolean {
    return typeof value === 'boolean'
  }

  static async updateFingerprintField(params: { hasFingerPrintReader: Primitives<HasFingerPrintReader>, entity: KeyboardModels }): Promise<void> {
    // Si no se ha pasado un nuevo valor del lector de huella no realiza ninguna acción
    if (params.hasFingerPrintReader === undefined) {
      return
    }
    // Verifica que si el actual y el nuevo valor son iguales no realice una busqueda en el repositorio
    if (params.entity.hasFingerPrintReaderValue === params.hasFingerPrintReader) {
      return
    }
    // Actualiza el campo hasFingerPrintReader de la entidad {@link ModelSeries} con el nuevo valor del lector de huella
    params.entity.updateHasFingerPrintReader(params.hasFingerPrintReader)
  }
}
