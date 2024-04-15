import { Criteria } from '../../../Shared/domain/criteria/Criteria'
import { Filter } from '../../../Shared/domain/criteria/Filter'
import { FilterField } from '../../../Shared/domain/criteria/FilterField'
import { FilterOperator } from '../../../Shared/domain/criteria/FilterOperator'
import { Filters } from '../../../Shared/domain/criteria/Filters'
import { FilterValue } from '../../../Shared/domain/criteria/FilterValue'
import { Order } from '../../../Shared/domain/criteria/Order'
import { type Repository } from '../../../Shared/domain/Repository'
import { type SearchByCriteriaQuery } from '../../../Shared/domain/SearchByCriteriaQuery'
import { type EmployeePrimitives } from '../domain/Employee'

export class EmployeeDeviceByCriteriaSearcher {
  constructor (private readonly repository: Repository) {}

  async search (query: SearchByCriteriaQuery): Promise<EmployeePrimitives[]> {
    const filters = query.filters.map((filter) => {
      return new Filter(
        new FilterField(filter.field),
        FilterOperator.fromValue(filter.operator),
        new FilterValue(filter.value))
    })
    const order = Order.fromValues(
      query.orderBy,
      query.orderType
    )
    const criteria = new Criteria(new Filters(filters), order, query.limit, query.offset)
    return await this.repository.employee.matchingByDevices(criteria)
  }
}
