export class MACAddress {
  static readonly macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

  constructor (readonly value: string) {

  }

  public static isValid (value: string): boolean {
    return this.macAddressRegex.test(value)
  }

  public static invalidMessage (value: string): string {
    return `"${value}" no es una dirección MAC válida`
  }
}
