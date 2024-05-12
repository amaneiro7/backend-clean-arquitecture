import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'


export class MemoryRamValues extends NumberValueObject {
  private readonly min = 0
  private readonly max = 32
  private readonly numStep = 9
  private readonly minStep = this.max / Math.pow(2, this.numStep - 1)
  
  constructor (readonly value: number) {
    super(value)

    // Ensure the validity of the memory ram capacity value
    this.ensureIsValid(value)
  }

  // Convert the memory ram capacity value to its primitive representation
  toPrimitives (): number {
    return this.value
  }

  static fromValues (value: Primitives<MemoryRamValues>):MemoryRamValues  {
    return new MemoryRamValues(value)
  }

  private generarSecuencia(): number[] {
    const secuencia: number[] = [this.min]
    let valorActual = this.minStep
    for (let i = 0; i < this.numStep; i++) {
        secuencia.push(valorActual)
        valorActual *= 2
    }
    return secuencia
}

  // Ensure the validity of the memory ram capacity value
  private ensureIsValid (value: number): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid Ram Value`)
    }
  }

  
  private isValid (value: number): boolean {
    const secuencia = this.generarSecuencia()
    return secuencia.includes(value)
  }
}
