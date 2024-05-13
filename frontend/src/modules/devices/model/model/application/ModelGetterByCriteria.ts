
import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { Filter } from '../../../../shared/domain/criteria/Filter'
import { FilterField } from '../../../../shared/domain/criteria/FilterField'
import { FilterOperator } from '../../../../shared/domain/criteria/FilterOperators'
import { Filters } from '../../../../shared/domain/criteria/Filters'
import { FilterValue } from '../../../../shared/domain/criteria/FilterValue'
import { Limit } from '../../../../shared/domain/criteria/Limit'
import { Order } from '../../../../shared/domain/criteria/Order'
import { Repository } from '../../../../shared/domain/repository'
import { SearchByCriteriaQuery } from '../../../../shared/infraestructure/criteria/SearchByCriteriaQuery'
import { ModelPrimitives } from '../domain/Model'

export class ModelGetterByCriteria {
  constructor (private readonly repository: Repository) { }
  async get (query: SearchByCriteriaQuery): Promise<ModelPrimitives[]> {
    const filters = query.filters.length > 0 && query.filters.map((filter) => {
      return new Filter(
        new FilterField(filter.field),
        FilterOperator.fromValue(filter.operator),
        new FilterValue(filter.value))
    })
    const order = Order.fromValues(query.orderBy, query.orderType)
    const limit = new Limit(query.limit)
    const offset = new Limit(query.offset)
    const criteria = new Criteria(new Filters(filters), order, limit, offset)

    return await this.repository.model.getByCriteria(criteria)
  }
}
