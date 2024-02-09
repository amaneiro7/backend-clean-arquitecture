import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'

export const useMemoryRam = (repository: Repository) => {
  const allCategoryGetter = new All(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategory] = useState<CategoryPrimitives[]>([])

  function getCategory () {
    setLoading(true)
    allCategoryGetter
      .get()
      .then((res) => {
        setCategory(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getCategory()

    return () => {
      setCategory([])
    }
  }, [])

  return {
    categories,
    loading,
    error
  }
}
