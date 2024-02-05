import { type FiltersPrimitives } from './Filter'
import { Filters } from './Filters'
import { Order } from './Order'

export class Criteria {
  constructor (
    readonly filters: Filters,
    readonly order: Order
  ) {}

  static fromPrimitives (
    filters: FiltersPrimitives[],
    orderBy: string | null,
    orderType: string | null
  ): Criteria {
    return new Criteria(
      Filters.fromPrimitives(filters),
      Order.fromPrimitives(orderBy, orderType)
    )
  }
}
