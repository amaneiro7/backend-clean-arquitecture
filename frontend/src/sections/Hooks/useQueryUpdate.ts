import { useCallback, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

export const useSearchByCriteriaQuery = (defaultQuery?: SearchByCriteriaQuery) => {
  const [query, setQuery] = useState<SearchByCriteriaQuery>(defaultQuery ?? {
    filters: []
  })

  const addFilter = useCallback((payload: SearchByCriteriaQuery) => {
    const filterIndex = query.filters.findIndex(filter => filter.field === payload.filters[0].field)
    const newFilter = [...query.filters]
    if (filterIndex >= 0) {
      newFilter[filterIndex] = payload.filters[0]
    } else {
      newFilter.push(payload.filters[0])
    }
    const filterWithoutEmptyValues = newFilter.filter(filter => filter.value !== '')
    setQuery(prev => ({ ...prev, filters: filterWithoutEmptyValues }))
  }, [query.filters])


  const cleanFilters = useCallback((initialFiltier?: SearchByCriteriaQuery) => {
    setQuery(prev => ({ ...prev, filters: initialFiltier.filters ?? [] }))
  }, [])

  return {
    query,
    addFilter,
    cleanFilters
  }
}
