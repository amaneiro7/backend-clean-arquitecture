import { BooleanValueObject } from '../../../../../Shared/domain/value-object/BooleanValueObject'
import { InvalidArgumentError } from '../../../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { ComputerModels } from './ComputerModels'

export class HasHDMI extends BooleanValueObject {
  constructor (readonly value: boolean) {
    super(value)

    this.ensureIsValid(value)
  }

  toPrimitives (): boolean {
    return this.value
  }

  private ensureIsValid (value: boolean): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`This <${value}> is not a valid type`)
    }
  }

  private isValid (value: boolean): boolean {
    return typeof value === 'boolean'
  }

  static async updateDVIField(params: { hasHDMI: Primitives<HasHDMI>, entity: ComputerModels }): Promise<void> {
    
    if (params.hasHDMI === undefined) {
      return
    }
    
    if (params.entity.hasHDMIValue === params.hasHDMI) {
      return
    }
    
    params.entity.updateHasHDMI(params.hasHDMI)
  }
}

