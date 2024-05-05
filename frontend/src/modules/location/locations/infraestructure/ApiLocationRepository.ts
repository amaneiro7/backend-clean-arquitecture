import { type LocationPrimitives } from '../domain/location'
import { type LocationRepository } from '../domain/locationRepository'
import { makeRequest } from '../../../shared/infraestructure/fetching'
import { Criteria } from '../../../shared/domain/criteria/Criteria'

export class ApiLocationRepository implements LocationRepository {
  private readonly endpoint: string = 'locations'
  async getAll(): Promise<LocationPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}/all` })
  }

  async getByCriteria(criteria: Criteria): Promise<LocationPrimitives[]> {
    const criteriaPrimitives = criteria.toPrimitives()

    const filters = criteriaPrimitives.filters.length > 0 && criteriaPrimitives.filters.map(
      (filter, index) => {
        const { field, operator, value } = filter.toPrimitives()
        return `filters[${index}][field]=${field}&filters[${index}][operator]=${operator}&filters[${index}][value]=${value}`
      }
    )
    const paramsLimitAndOffset = criteriaPrimitives.limit ? `limit=${criteriaPrimitives.limit}&offset=${criteriaPrimitives.offset}` : undefined
    const paramsOrder = criteriaPrimitives.orderBy ? `orderBy=${criteriaPrimitives.orderBy}&orderType=${criteriaPrimitives.orderType}` : undefined
    const paramsFilters = filters ? `${filters.join('&')}` : undefined
    const queryParams = [paramsFilters, paramsLimitAndOffset, paramsOrder].join('&')
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}?${queryParams}` })
  }
}
