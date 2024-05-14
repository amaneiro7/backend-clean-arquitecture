import { useEffect, useState } from 'react'
import { type LocationPrimitives } from '../../../modules/location/locations/domain/location'
import { AllLocationGetter } from '../../../modules/location/locations/application/AllLocationGetter'
import { ApiLocationRepository } from '../../../modules/location/locations/infraestructure/ApiLocationRepository'

export interface UseLocation {
  locations: LocationPrimitives[]
  loading: boolean
  error: string | null
}

export const useLocation = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [locations, setLocation] = useState<LocationPrimitives[]>([])

  function getLocation() {
    setLoading(true)
    new AllLocationGetter(new ApiLocationRepository())
      .get()
      .then((res) => {
        setLocation(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getLocation()

    return () => {
      setLocation([])
    }
  }, [])

  return {
    locations,
    loading,
    error
  }
}
