import { InvalidArgumentError } from '../value-object/InvalidArgumentError'
import { type Primitives } from '../value-object/Primitives'
import { type FilterField } from './FilterField'
import { type Filters } from './Filters'
import { type Order } from './Order'

export class Criteria {
  constructor(
    public readonly filters: Filters,
    public readonly order: Order,
    public readonly limit?: number,
    public readonly offset?: number
  ) {
    if (offset !== undefined && limit === undefined) {
      throw new InvalidArgumentError('Limit must be defined if offset is defined')
    }
  }

  hasFilters(): boolean {
    return !this.filters.isEmpty()
  }

  hasOrder(): boolean {
    return this.order.hasOrder()
  }

  searchValueInArray(field: Primitives<FilterField>): boolean {
    return this.filters.value.some(filter => filter.field.value === field)
  }

  obtainFilterValue(field: Primitives<FilterField>) {
    return this.filters.value.map(filter => {
      if (filter.field.value === field) return filter.value.value
    })
  }

}
