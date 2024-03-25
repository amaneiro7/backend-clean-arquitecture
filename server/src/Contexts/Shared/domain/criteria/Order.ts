import { OrderBy } from './OrderBy'
import { OrderType, OrderTypes } from './OrderType'

export class Order {
  constructor (
    readonly orderBy: OrderBy,
    readonly orderType: OrderType
  ) {}

  public static fromPrimitives (orderBy?: string, orderType?: string): Order {
    if (orderBy === undefined) {
      return new Order(
        new OrderBy(''),
        new OrderType(OrderTypes.NONE)
      )
    }
    return new Order(
      new OrderBy(orderBy),
      OrderType.fromValue(orderType ?? OrderTypes.ASC)
    )
  }

  public hasOrder (): boolean {
    return !this.orderType.isNone()
  }
}
