import { InvalidArgumentError } from '../../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../../Shared/domain/value-object/NumberValueObject'
import { Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { ComputerModels } from './ComputerModels'

export class MemoryRamSlotQuantity extends NumberValueObject {
  private readonly MAX_SLOTS = 8
  private readonly MIN_SLOTS = 1

  constructor (readonly value: number) {
    super(value)

    this.ensureIsValidRange(value)
  }

  toPrimitives (): number {
    return this.value
  }

  private ensureIsValidRange (value: number): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`this value <${value}> is not a valid`)
    }
  }

  private isValid (value: number): boolean {
    return value >= this.MIN_SLOTS && value <= this.MAX_SLOTS
  }

  static async updateMemoryRamSlotQuantityField(params: { memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>, entity: ComputerModels }): Promise<void> {
    
    if (params.memoryRamSlotQuantity === undefined) {
      return
    }
    
    if (params.entity.memoryRamSlotQuantityValue === params.memoryRamSlotQuantity) {
      return
    }
    
    params.entity.updateMemoryRamSlotQuantity(params.memoryRamSlotQuantity)
  }
}
