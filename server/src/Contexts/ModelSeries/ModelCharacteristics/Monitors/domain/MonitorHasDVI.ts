import { BooleanValueObject } from '../../../../Shared/domain/value-object/BooleanValueObject'
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { MonitorModels } from './MonitorModels'

export class MonitorHasDVI extends BooleanValueObject {
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

  static async updateDVIField(params: { hasDVI: Primitives<MonitorHasDVI>, entity: MonitorModels }): Promise<void> {
    
    if (params.hasDVI === undefined) {
      return
    }
    
    if (params.entity.hasDVIValue === params.hasDVI) {
      return
    }
    
    params.entity.updateHasDVI(params.hasDVI)
  }
}
