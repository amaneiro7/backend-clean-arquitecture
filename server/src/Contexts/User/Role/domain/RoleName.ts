import { StringValueObject } from "../../../Shared/domain/value-object/StringValueObject"

export class RoleName extends StringValueObject {
  static readonly ACCEPTED_VALUES: Record<string, string> = {
    ADMIN: 'Admin',
    SPECIALIST: 'Especialista',
    COORD: 'Coordinador',
    GERENTE: 'Gerente'
  }

  constructor(readonly value: string) {
    super(value)
    if (!RoleName.isValid(value)) {
      throw new Error(RoleName.invalidMessage(value))
    }
  }

  public static isValid(value: string): boolean {
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }

  public static invalidMessage(value: string): string {
    return `${value} no es un role válido`
  }
}
