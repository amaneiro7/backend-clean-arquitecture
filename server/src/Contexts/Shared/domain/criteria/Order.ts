/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { OrderBy } from './OrderBy'
import { OrderType, OrderTypes } from './OrderType'

export class Order {
  constructor (
    readonly orderBy: OrderBy,
    readonly orderType: OrderType
  ) {}

  static fromPrimitives (orderBy: string | null, orderType: string | null): Order {
    return orderBy !== null
      ? new Order(new OrderBy(orderBy), new OrderType(orderBy as OrderTypes))
      : Order.none()
  }

  static none (): Order {
    return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE))
  }

  static desc (orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.DESC))
  }

  static asc (orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.ASC))
  }

  public hasOrder (): boolean {
    return !this.orderType.isNone()
  }
}
