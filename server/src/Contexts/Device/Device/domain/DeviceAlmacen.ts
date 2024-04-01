import { Criteria } from '../../../Shared/domain/criteria/Criteria'
import { Filter } from '../../../Shared/domain/criteria/Filter'
import { FilterField } from '../../../Shared/domain/criteria/FilterField'
import { FilterOperator, Operator } from '../../../Shared/domain/criteria/FilterOperator'
import { Filters } from '../../../Shared/domain/criteria/Filters'
import { FilterValue } from '../../../Shared/domain/criteria/FilterValue'
import { Order } from '../../../Shared/domain/criteria/Order'
import { OrderBy } from '../../../Shared/domain/criteria/OrderBy'
import { OrderType, OrderTypes } from '../../../Shared/domain/criteria/OrderType'

export class DeviceAlmacen extends Criteria {
  constructor () {
    super(
      new Filters([
        new Filter(
          new FilterField('typeOfSite'),
          new FilterOperator(Operator.EQUAL),
          new FilterValue('Almacén')
        )
      ]),
      new Order(
        new OrderBy('categoryId'),
        new OrderType(OrderTypes.ASC)
      )
    )
  }
}
