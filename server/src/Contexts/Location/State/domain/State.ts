import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StateId } from './StateId'
import { StateName } from './StateName'

export interface StatePrimitives {
  id: Primitives<StateId>
  name: Primitives<StateName>
}

export class State {
  constructor (
    private readonly id: StateId,
    private readonly name: StateName
  ) {}

  static fromPrimitives (primitives: StatePrimitives): State {
    return new State(
      new StateId(primitives.id),
      new StateName(primitives.name)
    )
  }

  toPrimitive (): StatePrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<StateId> {
    return this.id.value
  }

  get nameValue (): Primitives<StateName> {
    return this.name.value
  }
}
