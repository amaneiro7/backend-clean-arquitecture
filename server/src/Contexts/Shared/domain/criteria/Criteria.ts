import { InvalidArgumentError } from '../value-object/InvalidArgumentError'
import { type Filters } from './Filters'
import { type Order } from './Order'

export class Criteria {
  constructor (
    public readonly filters: Filters,
    public readonly order: Order,
    public readonly limit?: number,
    public readonly offset?: number
  ) {
    if (offset !== undefined && limit === undefined) {
      throw new InvalidArgumentError('Limit must be defined if offset is defined')
    }
  }

  hasFilters (): boolean {
    return this.filters.isEmpty()
  }
}
