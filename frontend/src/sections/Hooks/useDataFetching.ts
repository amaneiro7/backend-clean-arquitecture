import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
export const useMemoryRamType = (repository: Repository) => {
  const dataGetter = new AllMemoryRamTypeGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<MemoryRamTypePrimitives[]>([])

  function fetchData () {
    setLoading(true)
    dataGetter
      .get()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()

    return () => {
      setData([])
    }
  }, [])

  return {
    memoryRamTypes: data,
    loading,
    error
  }
}
