import { BooleanValueObject } from '../../../../../Shared/domain/value-object/BooleanValueObject'
import { InvalidArgumentError } from '../../../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { ComputerModels } from './ComputerModels'

export class HasDVI extends BooleanValueObject {
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

  static async updateDVIField(params: { hasDVI: Primitives<HasDVI>, entity: ComputerModels }): Promise<void> {
    
    if (params.hasDVI === undefined) {
      return
    }
    
    if (params.entity.hasDVIValue === params.hasDVI) {
      return
    }
    
    params.entity.updateHasDVI(params.hasDVI)
  }
}
