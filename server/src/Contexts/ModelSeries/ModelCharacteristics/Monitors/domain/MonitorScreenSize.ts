import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../Shared/domain/value-object/NumberValueObject'
import { Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { MonitorModels } from './MonitorModels'

export class MonitorScreenSize extends NumberValueObject {
  private readonly MIN_SIZE = 11
  private readonly MAX_SIZE = 35

  constructor (readonly value: number) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    return `${this.value} Inches`
  }

  private ensureIsValidName (value: Primitives<MonitorScreenSize>): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid Monitor Screen Size`)
    }
  }

  private isValid (value: Primitives<MonitorScreenSize>): boolean {
    return value >= this.MIN_SIZE && value <= this.MAX_SIZE
  }

  static async updateScreenSizeField(params: { ScreenSize: Primitives<MonitorScreenSize>, entity: MonitorModels }): Promise<void> {
    
    if (params.ScreenSize === undefined) {
      return
    }
    
    if (params.entity.screenSizeValue === params.ScreenSize) {
      return
    }
    
    params.entity.updateScreenSize(params.ScreenSize)
  }
}
