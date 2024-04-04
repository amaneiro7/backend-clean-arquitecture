import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export type CargosValues = typeof CargoName.AcceptedCargos[keyof typeof CargoName.AcceptedCargos]

export class CargoName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 30
  private readonly NAME_MIN_LENGTH = 15
  public static AcceptedCargos: Readonly<Record<string, string>> = {
    1: 'Analista',
    2: 'Especialista Senior',
    3: 'Coordinador',
    4: 'Gerente',
    5: 'Vicepresidente',
    6: 'Vicepresidente Ejecutivo',
    7: 'Cajero de Agencia',
    8: 'Coordinador de Agencia',
    9: 'Promotor de Agencia',
    10: 'SubGerente de Agencia',
    11: 'Gerente de Agencia'
  }

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidSerial(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidSerial (value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid Cargo name`)
    }
  }

  private isValid (name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }
}
