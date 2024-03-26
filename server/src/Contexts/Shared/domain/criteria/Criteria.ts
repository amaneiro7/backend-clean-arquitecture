import { InvalidArgumentError } from '../value-object/InvalidArgumentError'
import { type FiltersPrimitives } from './Filter'
import { Filters } from './Filters'
import { Order } from './Order'

// export interface QueryOptions {
//   where: Record<string, any>
//   limit?: number
//   offset?: number
//   order?: Array<[string, string]>
// }

// export interface Filter {
//   field: string
//   operator: string
//   value: any
// }
export class Criteria {
  constructor (
    public readonly filters: Filters,
    public readonly order: Order,
    public readonly limit?: number,
    public readonly offset?: number
  ) {
    if (offset !== null && limit === null) {
      throw new InvalidArgumentError('Limit must be defined if offset is defined')
    }
  }

  static fromPrimitives (
    filters: FiltersPrimitives[],
    orderBy: string | null,
    orderType: string | null,
    limit?: number | null,
    offset?: number | null
  ): Criteria {
    return new Criteria(
      Filters.fromPrimitives(filters),
      Order.fromPrimitives(orderBy, orderType)
    )
  }

  hasOrder (): boolean {
    return !this.order.isNone()
  }

  hasFilters (): boolean {
    return this.filters.isEmpty()
  }
}
