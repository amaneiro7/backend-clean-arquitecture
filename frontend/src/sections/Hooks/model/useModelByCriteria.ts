import { useCallback, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'
import { ModelGetterByCriteria } from '../../../modules/devices/model/model/application/ModelGetterByCriteria'
import { ApiModelRepository } from '../../../modules/devices/model/model/infraestructure/ApiModelRepository'

export interface UseModelByCriteria {
  models: ModelPrimitives[]
  loading: boolean
  error: string | null
  searchModelsByCriteria: (filter: SearchByCriteriaQuery) => void
}

export const useModelByCriteria = (): UseModelByCriteria => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [models, setModels] = useState<ModelPrimitives[]>([])

  const searchModelsByCriteria = useCallback((filter: SearchByCriteriaQuery) => {
    setLoading(true)
    new ModelGetterByCriteria(new ApiModelRepository())
      .get(filter)
      .then((model) => {
        setModels(model)
      })
      .catch((error: Error) => {
        console.error('searchModels', error)
        setError('An unexpected error occurred while trying to search models')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    models,
    loading,
    error,
    searchModelsByCriteria
  }
}
