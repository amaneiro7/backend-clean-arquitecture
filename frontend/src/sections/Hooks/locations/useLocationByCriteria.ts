import { useEffect, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { useSearchByCriteriaQuery } from '../useQueryUpdate'
import { LocationPrimitives } from '../../../modules/location/locations/domain/location'
import { LocationGetterByCriteria } from '../../../modules/location/locations/application/LocationGetterByCriteria'
import { ApiLocationRepository } from '../../../modules/location/locations/infraestructure/ApiLocationRepository'

export interface UseLocationByCriteria {
  locations: LocationPrimitives[]
  loading: boolean
  error: string | null
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
}

export const useLocationByCriteria = (defaultQuery?: SearchByCriteriaQuery): UseLocationByCriteria => {
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [locations, setLocations] = useState<LocationPrimitives[]>([])

  function searchLocationsByCriteria() {
    setLoading(true)
    new LocationGetterByCriteria(new ApiLocationRepository())
      .get(query)
      .then((location) => {
        setLocations(location)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchLocations', error)
        setError('An unexpected error occurred while trying to search Locations')
        setLoading(false)
      })
  }

  useEffect(() => {
    searchLocationsByCriteria()
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
