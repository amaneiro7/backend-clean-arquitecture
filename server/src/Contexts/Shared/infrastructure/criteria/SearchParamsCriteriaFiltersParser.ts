import { Filter } from '../../domain/criteria/Filter'
import { FilterField } from '../../domain/criteria/FilterField'
import { FilterOperator } from '../../domain/criteria/FilterOperator'
import { FilterValue } from '../../domain/criteria/FilterValue'

/* eslint-disable @typescript-eslint/no-extraneous-class */
export interface FilterType { value: string, operator: string, field: string };
export class SearchParamsCriteriaFiltersParser {
  static parseFilters (params: FilterType[] | undefined): Filter[] | Array<Map<string, string>> {
    if (params === undefined) {
      return new Array<Map<string, string>>()
    }

    return params.map(({ field, operator, value }) => {
      return new Filter(
        new FilterField(field),
        FilterOperator.fromValue(operator),
        new FilterValue(value)
      )
    })
  }
}
