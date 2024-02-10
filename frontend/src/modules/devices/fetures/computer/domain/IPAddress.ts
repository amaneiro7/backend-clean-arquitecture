export class IPAddress {
  static readonly IPADRRESS_VALIDATION = /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/

  constructor (readonly value: string) {

  }

  public static isValid (value: string): boolean {
    return this.IPADRRESS_VALIDATION.test(value)
  }

  public static invalidMessage (value: string): string {
    return `${value} Una Dirección IP válida debe tener un formato xxx.xxx.xxx`
  }
}
