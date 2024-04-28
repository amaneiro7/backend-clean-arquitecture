import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../../Shared/domain/value-object/Primitives'

export class ProcessorFrequency  {  
  private readonly MIN = 1
  private readonly MAX = 6


  constructor (readonly value: number | string) {    
    const parsedValue = this.convertToNumber(value)    
    this.value = parsedValue
    this.ensureIsValidName(this.value)
  }

  private convertToNumber(value: string | number): number {
    if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'string') {
      const numericString = value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
      return parseInt(numericString, 10);
    } else {
      throw new Error('Invalid value type. Must be string or number.');
    }
  }

  toPrimitives (): Primitives<ProcessorFrequency> {
    if (typeof this.value !== "number") {
      throw new InvalidArgumentError('Invalid processor frequency type')
    } 
    const frequencyInGHz = this.value.toFixed(2)
    return `${frequencyInGHz} GHz`


  }

  private ensureIsValidName (value: number): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid processor frequency`)
    }
  }

  private isValid (value: number): boolean {
    return value >= this.MIN && value <= this.MAX
  }
}
