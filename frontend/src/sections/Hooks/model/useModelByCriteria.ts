import { useEffect, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type Repository } from '../../../modules/shared/domain/repository'
import { useSearchByCriteriaQuery } from '../useQueryUpdate'
import { ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'
import { ModelGetterByCriteria } from '../../../modules/devices/model/model/application/ModelGetterByCriteria'

export interface UseModelByCriteria {
  models: ModelPrimitives[]
  loading: boolean
  error: string | null
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
}

export const useModelByCriteria = (repository: Repository, defaultQuery?: SearchByCriteriaQuery): UseModelByCriteria => {
  const modelByCriteria = new ModelGetterByCriteria(repository)  
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState<boolean>(true)  
  const [error, setError] = useState<string | null>(null)  
  const [models, setModels] = useState<ModelPrimitives[]>([])  

  function searchModelsByCriteria () {
    setLoading(true)
    modelByCriteria
      .get(query)
      .then((model) => {
        setModels(model)
        setLoading(false)
      })
      .catch((error: any) => {
        console.error('searchModels', error)
        setError('An unexpected error occurred while trying to search models')
        setLoading(false)
      })
  }

  useEffect(() => {
    searchModelsByCriteria()
    return () => {
      setModels([])
    }
  }, [query])

  return {
    models,
    loading,
    error,
    addFilter,
    cleanFilters
  }
}
