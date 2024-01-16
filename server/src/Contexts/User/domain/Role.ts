import { EnumValueObject } from '../../Shared/domain/EnumValueObject'
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError'

export enum RoleTypes {
  ADMIN = 'Admin',
  SPECIALIST = 'Especialista',
  COORD = 'Coordinador',
  GERENTE = 'Gerente'
}

export class Roles extends EnumValueObject<RoleTypes> {
  constructor (value: RoleTypes) {
    super(value, Object.values(RoleTypes))
  }

  static fromValue (value: string): Roles {
    for (const roleTypesValue of Object.values(RoleTypes)) {
      if (value === roleTypesValue.toString()) {
        return new Roles(roleTypesValue)
      }
    }

    throw new InvalidArgumentError(`The role type ${value} is invalid`)
  }

  static toPrimitive (): RoleTypes[] {
    return Object.values(RoleTypes)
  }

  protected throwErrorForInvalidValue (value: RoleTypes): void {
    throw new InvalidArgumentError(`The Roles type ${value} is invalid`)
  }
}
