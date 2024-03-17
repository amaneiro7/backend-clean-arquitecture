import { InputTypeId } from './InputTypeId'
import { InputTypeName } from './InputTypeName'

export interface InputTypePrimitives {
  id: number
  name: string
}

export class InputType {
  constructor (
    private readonly id: InputTypeId,
    private readonly name: InputTypeName
  ) {}

  static fromPrimitives (primitives: InputTypePrimitives): InputType {
    return new InputType(
      new InputTypeId(primitives.id),
      new InputTypeName(primitives.name)
    )
  }

  toPrimitive (): any {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): number {
    return this.id.value
  }

  get nameValue (): string {
    return this.name.value
  }
}
