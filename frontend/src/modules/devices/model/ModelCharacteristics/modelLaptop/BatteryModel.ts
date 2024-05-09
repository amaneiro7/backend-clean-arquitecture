export class BatteryModel {
    static readonly NAME_MIN_LENGTH = 3
    static readonly NAME_MAX_LENGTH = 20
  
    constructor (readonly value: string) {
      if (!BatteryModel.isValid(value)) {
        throw new Error(BatteryModel.invalidMessage(value))
      }
    }
  
    public static isValid (value: string): boolean {
      return value.length >= BatteryModel.NAME_MIN_LENGTH && value.length <= BatteryModel.NAME_MAX_LENGTH
    }
  
    public static invalidMessage (value: string): string {
      return `El nombre ${value} no es válido. Debe tener entre ${BatteryModel.NAME_MIN_LENGTH} y ${BatteryModel.NAME_MAX_LENGTH} caracteres`
    }
  }
  