/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { InvalidArgumentError } from '../value-object/InvalidArgumentError'
import { FilterField } from './FilterField'
import { FilterOperator, Operator } from './FilterOperator'
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

  // Esto es simplemente otra forma de instanciar nuestra clase
  // La usamos cuando queremos hacer logica extra en nuestra instanciación
  static fromPrimitives (field?: string, operator?: string, value?: string): Filter {
    if (field === undefined || operator === undefined || value === undefined) {
      throw new InvalidArgumentError('The filter is invalid')
    }

    return new Filter(
      new FilterField(field),
      new FilterOperator(Operator[operator as keyof typeof Operator]),
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
