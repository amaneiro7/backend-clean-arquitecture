import { useEffect, useState } from 'react'
import { AllCategoryGetter } from '../../../modules/devices/category/application/AllCategoryGetter'
import { type CategoryPrimitives } from '../../../modules/devices/category/domain/Category'
import { ApiCategoryRepository } from '../../../modules/devices/category/infraestructure/ApiCategoryRepository'

export interface UseCategory {
  categories: CategoryPrimitives[]
  loading: boolean
  error: string | null
}

export const useCategory = (): UseCategory => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategory] = useState<CategoryPrimitives[]>([])
  
  function getCategory () {
    setLoading(true)    
    new AllCategoryGetter(new ApiCategoryRepository())
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
