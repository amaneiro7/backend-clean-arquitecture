import { useState } from 'react'
import { type SearchByCriteriaQuery } from '../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

export const useSearchByCriteriaQuery = () => {
  const [query, setQuery] = useState<SearchByCriteriaQuery>({
    filters: []
  })

  const addFilter = (payload: SearchByCriteriaQuery) => {
    const filterIndex = query.filters.findIndex(filter => filter.field === payload.filters[0].field)
    let newFilter = []
    if (filterIndex >= 0) {
      newFilter = [...query.filters]
    } else {
      newFilter = [...query.filters, ...payload.filters]
    }
    const filterWithoutEmptyValues = newFilter.filter(filter => filter.value !== '')
    setQuery(prev => ({ ...prev, filters: filterWithoutEmptyValues }))
  }

  const cleanFilters = (initialFiltier?: SearchByCriteriaQuery) => {
    setQuery(prev => ({ ...prev, filters: initialFiltier.filters ?? [] }))
  }

  return {
    query,
    addFilter,
    cleanFilters
  }
}
