import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'
import { AllTypeOfSiteGetter } from '../../../modules/location/typeofsites/application/AllTypeOfSiteGetter'
import { TypeOfSitePrimitives } from '../../../modules/location/typeofsites/domain/typeOfSite'

export interface UseTypeOfSite {
  typeOfSite: TypeOfSitePrimitives[]
  loading: boolean
  error: Error | null
}

export const useTypeOfSite = (repository: Repository): UseTypeOfSite => {
  const getter = new AllTypeOfSiteGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [typeOfSite, setTypeOfSite] = useState<TypeOfSitePrimitives[]>([])

  function gefetchData () {
    setLoading(true)
    getter
      .get()
      .then((res) => {
        setTypeOfSite(res)
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
      setTypeOfSite([])
    }
  }, [])

  return {
    typeOfSite,
    loading,
    error
  }
}
