import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'
import { type LocationPrimitives } from '../../../modules/location/locations/domain/location'
import { AllLocationGetter } from '../../../modules/location/locations/application/AllLocationGetter'

export interface UseLocation {
  locations: LocationPrimitives[]
  loading: boolean
  error: string | null
}

export const useLocation = (repository: Repository) => {
  const allLocationGetter = new AllLocationGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [locations, setLocation] = useState<LocationPrimitives[]>([])

  function getLocation () {
    setLoading(true)
    allLocationGetter
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
