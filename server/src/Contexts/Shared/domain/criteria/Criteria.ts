import { type FiltersPrimitives } from './Filter'
import { Filters } from './Filters'
import { Order } from './Order'

export class Criteria {
  constructor (
    readonly filters: Filters,
    readonly order: Order,
    readonly limit?: number,
    readonly offset?: number
  ) {}

  static fromPrimitives (
    filters: FiltersPrimitives[],
    orderBy: string | null,
    orderType: string | null,
    limit?: number,
    offset?: number
  ): Criteria {
    return new Criteria(
      Filters.fromPrimitives(filters),
      Order.fromPrimitives(orderBy, orderType),
      limit,
      offset
    )
  }

  public hasFilters (): boolean {
    return this.filters.value.length > 0
  }
}
