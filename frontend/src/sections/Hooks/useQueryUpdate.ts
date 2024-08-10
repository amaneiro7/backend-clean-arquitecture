import { useCallback, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

export const useSearchByCriteriaQuery = (defaultQuery?: SearchByCriteriaQuery) => {
  const [query, setQuery] = useState<SearchByCriteriaQuery>(defaultQuery ?? {
    filters: []
  })

  /**
   * Updates the search query by adding a new filter or replacing an existing one.
   * If the filter is a default filter, it is removed if the value is empty,
   * otherwise it is added/replaced.
   *
   * @param {SearchByCriteriaQuery} payload - The new filter to add or replace.
   * @return {void} This function does not return anything.
   */
  const addFilter = useCallback((payload: SearchByCriteriaQuery) => {
    setQuery(prevQuery => {

      // Extract the new filter to add from the payload
      const filterToAdd = payload.filters[0]

      // Check if the new filter is a default filter
      const isDefaultFilter = defaultQuery?.filters.some(df => df.field === filterToAdd.field) ?? false

      // Find the index of the existing filter with the same field, if any
      const filterIndex = prevQuery.filters.findIndex(filter => filter.field === filterToAdd.field)

      // Create a copy of the current query state
      const newFilter = structuredClone(prevQuery)

      // If the filter is not a default filter, update or add it
      if (!isDefaultFilter) {
        if (filterIndex >= 0) {
          // Replace the existing filter if it exists
          newFilter.filters[filterIndex] = filterToAdd
        } else {
          // Add the new filter if it doesn't exist
          newFilter.filters.push(filterToAdd)
        }
      } else {

        // If the filter is a default filter, remove it if the value is empty
        newFilter.filters = newFilter.filters.filter(filter => filter.field !== filterToAdd.field)

        if (filterToAdd.value !== '') {
          // If the filter value is not empty, add it to the filters
          newFilter.filters.push(filterToAdd)
        } else {
          // If the filter value is empty, add all the default filters back
          defaultQuery?.filters.forEach((filter) => { newFilter.filters.push(filter) })
        }
      }

      // Remove filters with empty values
      const filterWithoutEmptyValues = newFilter.filters.filter(filter => filter.value !== '')

      // Update the query state with the new filters
      return { ...prevQuery, filters: filterWithoutEmptyValues }
    })
  }, [defaultQuery?.filters])


  const cleanFilters = useCallback(() => {
    setQuery(prev => ({ ...prev, filters: defaultQuery.filters ?? [] }))
  }, [defaultQuery.filters])

  return {
    query,
    addFilter,
    cleanFilters
  }
}
