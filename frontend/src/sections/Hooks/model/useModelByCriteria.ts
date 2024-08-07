import { useCallback, useEffect, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'
import { useSearchByCriteriaQuery } from '../useQueryUpdate'
import { ModelGetterByCriteria } from '../../../modules/devices/model/model/application/ModelGetterByCriteria'
import { ApiModelRepository } from '../../../modules/devices/model/model/infraestructure/ApiModelRepository'

export interface UseModelByCriteria {
  models: ModelPrimitives[]
  loading: boolean
  error: string | null
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
}

export const useModelByCriteria = (defaultQuery?: SearchByCriteriaQuery): UseModelByCriteria => {
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [models, setModels] = useState<ModelPrimitives[]>([])

  const searchModelsByCriteria = useCallback(() => {
    setLoading(true)
    new ModelGetterByCriteria(new ApiModelRepository())
      .get(query)
      .then((model) => {
        setModels(model)
        setLoading(false)
      })
      .catch((error: Error) => {
        console.error('searchModels', error)
        setError('An unexpected error occurred while trying to search models')
        setLoading(false)
      })
  }, [query])

  useEffect(() => {
    searchModelsByCriteria()
    return () => {
      setModels([])
    }
  }, [searchModelsByCriteria])

  return {
    models,
    loading,
    error,
    addFilter,
    cleanFilters
  }
}
