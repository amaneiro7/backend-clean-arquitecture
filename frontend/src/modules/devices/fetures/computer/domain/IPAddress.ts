export class IPAddress {
  static readonly IPADRRESS_VALIDATION = /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/

  constructor (readonly value: string | null) {
    if (value === '' || value === undefined || value == null) {
      this.value = null
    } else {
      this.value = value
    }

    if (!IPAddress.isValid(this.value)) {
      throw new Error(IPAddress.invalidMessage(value))
    }
  }

  public static isValid (value: string | null): boolean {
    if (value === null || value === '') return true
    return this.IPADRRESS_VALIDATION.test(value)
  }

  public static invalidMessage (value: string | null | '' | undefined): string {
    return `"${value}" no es un dirección IP válida, Una Dirección MAC válida debe tener un formato xxx.xxx.xxx.xxx`
  }
}
