import { NumberValueObject } from "../../../../shared/domain/value-object/NumberValueObject"

export class MemoryRamSlotQuantity extends NumberValueObject {
    static readonly MIN = 1
    static readonly MAX = 8
    static readonly STEPS = 2
  
    constructor (readonly value: number) {
        super(value)
      if (!MemoryRamSlotQuantity.isValid(value)) {
        throw new Error(MemoryRamSlotQuantity.invalidMessage())
      }
    }
  
    public static isValid (value: number): boolean {
      if ( value < MemoryRamSlotQuantity.MIN && value > MemoryRamSlotQuantity.MAX) return false
      if (value % 2 !== 0 && value !== 1) return false
      return true
    }
  
    public static invalidMessage (): string {
      return `El valor Debe estar entre ${MemoryRamSlotQuantity.MIN} y ${MemoryRamSlotQuantity.MAX} y ser par o ser 1`
    }
  }
  