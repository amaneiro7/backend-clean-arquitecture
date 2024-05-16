import { useEffect, useState } from 'react'
import { type LocationPrimitives } from '../../../modules/location/locations/domain/location'
import { AllLocationGetter } from '../../../modules/location/locations/application/AllLocationGetter'
import { ApiLocationRepository } from '../../../modules/location/locations/infraestructure/ApiLocationRepository'
import { LocationCreator } from '../../../modules/location/locations/application/LocationCreator'
import { LocationGetter } from '../../../modules/location/locations/application/LocationGetter'

export interface UseLocation {
  locations: LocationPrimitives[]
  loading: boolean
  error: string | null
  createLocation: (FormData: LocationPrimitives) => Promise<void>
  getLocation: LocationGetter
}

export const useLocation = (): UseLocation => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [locations, setLocation] = useState<LocationPrimitives[]>([])

  const repository = new ApiLocationRepository()

  async function createLocation (formData: LocationPrimitives) {
    const data = await new LocationCreator(repository).create(formData)
    getLocations()
    return data
  }

  const getLocation = new LocationGetter(repository)

  function getLocations() {
    setLoading(true)
    new AllLocationGetter(repository)
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
    getLocations()

    return () => {
      setLocation([])
    }
  }, [])

  return {
    locations,
    loading,
    error,
    createLocation,
    getLocation
  }
}
