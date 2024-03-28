import { OrderBy } from './OrderBy'
import { OrderType, OrderTypes } from './OrderType'

export class Order {
  readonly orderBy: OrderBy
  readonly orderType: OrderType

  constructor (orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy
    this.orderType = orderType
  }

  // Esto es simplemente otra forma de instanciar nuestra clase
  // La usamos cuando queremos hacer logica extra en nuestra instanciación
  public static fromValues (orderBy?: string, orderType?: string): Order {
    if (!orderBy) {
      return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE))
    }

    return new Order(new OrderBy(orderBy), OrderType.fromValue(orderType || OrderTypes.ASC))
  }

  // Confirmamos que order sea acendente o decendente
  public hasOrder () {
    return !this.orderType.isNone()
  }
}
