import { useEffect, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type Repository } from '../../../modules/shared/domain/repository'
import { useSearchByCriteriaQuery } from '../useQueryUpdate'
import { LocationPrimitives } from '../../../modules/location/locations/domain/location'
import { LocationGetterByCriteria } from '../../../modules/location/locations/application/LocationGetterByCriteria'

export interface UseLocationByCriteria {
  locations: LocationPrimitives[]
  loading: boolean
  error: string | null
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
}

export const useLocationByCriteria = (repository: Repository, defaultQuery?: SearchByCriteriaQuery): UseLocationByCriteria => {
  const locationByCriteria = new LocationGetterByCriteria(repository)  
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState<boolean>(true)  
  const [error, setError] = useState<string | null>(null)  
  const [locations, setLocations] = useState<LocationPrimitives[]>([])  

  function searchEmployeesByCriteria () {
    setLoading(true)
    locationByCriteria
      .get(query)
      .then((location) => {
        setLocations(location)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchEmployees', error)
        setError('An unexpected error occurred while trying to search employees')
        setLoading(false)
      })
  }

  useEffect(() => {
    searchEmployeesByCriteria()
    return () => {
      setLocations([])
    }
  }, [query])

  return {
    locations,
    loading,
    error,
    addFilter,
    cleanFilters
  }
}
