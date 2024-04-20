export class MemoryRamCapacity {
  static readonly minStep = 0.5
  static readonly min = 0
  static readonly max = 32 * this.minStep

  constructor (readonly value: number) {
    if (!MemoryRamCapacity.isValid(value)) {
      throw new Error(MemoryRamCapacity.invalidMessage(value))
    }
  }

  public static isValid (value: number): boolean {
    return (value % this.minStep) === 0
  }

  public static invalidMessage (value: number): string {
    return `${value} no es una capacidad de memoria RAM válido`
  }
}
