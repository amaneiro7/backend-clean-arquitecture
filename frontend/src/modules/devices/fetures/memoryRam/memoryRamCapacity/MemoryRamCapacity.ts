export class MemoryRamCapacity {
  constructor (readonly value: number) {
    if (!MemoryRamCapacity.isValid(value)) {
      throw new Error(MemoryRamCapacity.invalidMessage(value))
    }
  }

  public static isValid (value: number): boolean {
    return (value & (value - 1)) === 0 && value !== 0 && (value & 511) === 0
  }

  public static invalidMessage (value: number): string {
    return `${value} no es una capacidad de memoria RAM válido`
  }
}
