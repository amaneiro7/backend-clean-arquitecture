/* eslint-disable @typescript-eslint/no-extraneous-class */
export interface FilterType { value: string, operator: string, field: string };
export class SearchParamsCriteriaFiltersParser {
  static parseFilters (params: FilterType[]): Array<Map<string, string>> {
    if (params === undefined) {
      return new Array<Map<string, string>>()
    }

    return params.map(filter => {
      const field = filter.field
      const value = filter.value
      const operator = filter.operator

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value]
      ])
    })
  }
}
