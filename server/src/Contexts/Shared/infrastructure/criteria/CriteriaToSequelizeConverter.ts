import { type FindOptions, Op } from 'sequelize'
import { type Criteria } from '../../domain/criteria/Criteria'
import { type Filter } from '../../domain/criteria/Filter'

export type Mappings = Record<string, string>

export class CriteriaToSequelizeConverter {
  convert(criteria: Criteria, mappings: Mappings = {}): FindOptions {
    const query: FindOptions = {}

    if (criteria.hasFilters()) {
      query.where = criteria.filters.value.reduce((acc, filter) => {
        return { ...acc, ...this.generateWhereQuery(filter, mappings) }
      }, {})
    }
    if (criteria.hasOrder()) {
      query.order = [
        [criteria.order.orderBy.value, criteria.order.orderType.value]]
    }

    if (criteria.limit !== undefined) {
      query.limit = criteria.limit
    }

    if (criteria.limit !== undefined && criteria.offset !== undefined) {
      query.offset = criteria.limit * (criteria.offset - 1)
    }

    return query
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private generateWhereQuery(filter: Filter, mappings: Mappings = {}) {
    const field = mappings[filter.field.value] ?? filter.field.value

    if (filter.operator.isContains()) {
      return { [field]: { [Op.iLike]: `%${filter.value.value}%` } }
    }

    if (filter.operator.isNotContains()) {
      return { [field]: { [Op.notILike]: `%${filter.value.value}%` } }
    }

    if (filter.operator.isNotEquals()) {
      return { [field]: filter.value.value }
    }

    return { [field]: filter.value.value }
    
  }
}
