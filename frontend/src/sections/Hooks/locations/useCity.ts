import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'
import { AllCityGetter } from '../../../modules/location/city/application/AllCityGetter'
import { CityPrimitives } from '../../../modules/location/city/domain/city'

export interface UseCities {
  cities: CityPrimitives[]
  loading: boolean
  error: Error | null
}

export const useCity = (repository: Repository): UseCities => {
  const getter = new AllCityGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cities, setCities] = useState<CityPrimitives[]>([])

  function gefetchData () {
    setLoading(true)
    getter
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
