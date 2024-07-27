import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type RoleId } from './RoleId'
import { type RoleName } from './RoleName'

export interface RolePrimitives {
  id: Primitives<RoleId>
  name: Primitives<RoleName>
}

export class Role {
  constructor(
    private readonly id: RoleId,
    private readonly name: RoleName
  ) { }

  idValue(): Primitives<RoleId> {
    return this.id.value
  }

  nameValue(): Primitives<RoleName> {
    return this.name.value
  }

  toPrimitives(): RolePrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
