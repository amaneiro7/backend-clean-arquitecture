/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FilterField } from './FilterField'
import { FilterOperator } from './FilterOperator'
import { FilterValue } from './FilterValue'

export interface FiltersPrimitives {
  field: string
  operator: string
  value: string
}

export class Filter {
  constructor (
    readonly field: FilterField,
    readonly operator: FilterOperator,
    readonly value: FilterValue
  ) {}

  static fromPrimitives (field: string, operator: string, value: string): Filter {
    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(value)
    )
  }

  toPrimitives (): FiltersPrimitives {
    return {
      field: this.field.value,
      operator: this.operator.value,
      value: this.operator.value
    }
  }
}
