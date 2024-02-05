import { InvalidArgumentError } from '../value-object/InvalidArgumentError'
import { EnumValueObject } from '../value-object/EnumValueObject'

export enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS'
}

export class FilterOperator extends EnumValueObject<Operator> {
  constructor (public readonly value: Operator) {
    super(value, Object.values(Operator))
  }

  static fromValue (value: string): FilterOperator {
    for (const operatorValue of Object.values(Operator)) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue)
      }
    }

    throw new InvalidArgumentError(`The filter operator ${value} is invalid`)
  }

  public isPositive (): boolean {
    return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS
  }

  protected throwErrorForInvalidValue (value: Operator): void {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`)
  }

  static equal (): FilterOperator {
    return this.fromValue(Operator.EQUAL)
  }
}
