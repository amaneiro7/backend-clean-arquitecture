import { useEffect, useState } from 'react'
import { AllCityGetter } from '../../../modules/location/city/application/AllCityGetter'
import { CityPrimitives } from '../../../modules/location/city/domain/city'
import { ApiCityRepository } from '../../../modules/location/city/infraestructure/ApiCityRepository'

export interface UseCities {
  cities: CityPrimitives[]
  loading: boolean
  error: Error | null
}

export const useCity = (): UseCities => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cities, setCities] = useState<CityPrimitives[]>([])

  function gefetchData() {
    setLoading(true)
    new AllCityGetter(new ApiCityRepository())
      .get()
      .then((res) => {
        setCities(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    gefetchData()

    return () => {
      setCities([])
    }
  }, [])

  return {
    cities,
    loading,
    error
  }
}
