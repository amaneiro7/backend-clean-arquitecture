// cretae a class CriteriaToSequelizeConverter from CriteriaPattern?
import { type FindOptions, Op } from 'sequelize'
import { type Criteria } from '../../domain/criteria/Criteria'
import { type Filter } from '../../domain/criteria/Filter'

// interface CriteriaPattern {
//   property: string
//   operator: '=' | '!=' | '>' | '<' | '>=' | '<='
//   value: string | number | boolean
// }

//   type CriteriaToSequelizeConverter = (criteria: CriteriaPattern[]) => WhereOptions<any>
type Mappings = Record<string, string>

export class CriteriaToSequelizeConverter {
  convert (criteria: Criteria, mappings: Mappings = {}): FindOptions<any> {
    const query: FindOptions<any> = {}

    if (criteria.hasFilters()) {
      query.where = criteria.filters.value.reduce((acc, filter) => {
        return { ...acc, ...this.generateWhereQuery(filter, mappings) }
      }, {})

      if (criteria.hasOrder()) {
        query.order = {
          [criteria.order.orderBy.value]: criteria.order.orderType.value
        }
      }

      if (criteria.limit !== null) {
        query.limit = criteria.limit
      }

      if (criteria.limit !== null && criteria.offset !== null) {
        query.offset = criteria.limit * (criteria.offset - 1)
      }
    }

    return query
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private generateWhereQuery (filter: Filter, mappings: Mappings = {}) {
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
// const criteriaToSequelize: CriteriaToSequelizeConverter = (criteria: CriteriaPattern[]) => {
//   const where: WhereOptions<any> = {}
//   criteria.forEach((criterion: CriteriaPattern) => {
//     const { property, operator, value } = criterion
//     if (operator === '=') {
//       where[property] = value
//     } else if (operator === '!=') {
//       where[property] = { [Op.not]: value }
//     } else if (operator === '>') {
//       where[property] = { [Op.gt]: value }
//     } else if (operator === '<') {
//       where[property] = { [Op.lt]: value }
//     } else if (operator === '>=') {
//       where[property] = { [Op.gte]: value }
//     } else if (operator === '<=') {
//       where[property] = { [Op.lte]: value }
//     }
//   })
//   return where
// }

// // Example usage
// const whereClause = criteriaToSequelize([
//   { property: 'age', operator: '>', value: 18 },
//   { property: 'gender', operator: '=', value: 'male' }
// ])

// // Result
// // { age: { gt: 18 }, gender: 'male' }
