import { BooleanValueObject } from '../../../../../Shared/domain/value-object/BooleanValueObject'
import { InvalidArgumentError } from '../../../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { ComputerModels } from './ComputerModels'

export class HasWifiAdapter extends BooleanValueObject {
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

  static async updateWifiAdapterField(params: { hasWifiAdapter: Primitives<HasWifiAdapter>, entity: ComputerModels }): Promise<void> {
    
    if (params.hasWifiAdapter === undefined) {
      return
    }
    
    if (params.entity.hasWifiAdapterValue === params.hasWifiAdapter) {
      return
    }
    
    params.entity.updateHasWifiAdapter(params.hasWifiAdapter)
  }
}
