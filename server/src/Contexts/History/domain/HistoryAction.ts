import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject'

const acionTypes = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
} as const

export type ActionType = typeof acionTypes[keyof typeof acionTypes]

export class Action extends StringValueObject {
  constructor (readonly value: ActionType) {
    super(value)

    this.ensureIsValid(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValid (value: ActionType): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<this ${value}> is not a valid action type`)
    }
  }

  private isValid (name: ActionType): boolean {
    return Object.values(acionTypes).includes(name)
  }
}
