import { useEffect, useState } from 'react'
import { AllModelGetter } from '../../../modules/devices/model/model/application/AllModelGetter'
import { ModelCreator } from '../../../modules/devices/model/model/application/ModelCreator'
import { ModelGetter } from '../../../modules/devices/model/model/application/ModelGetter'
import { ApiModelRepository } from '../../../modules/devices/model/model/infraestructure/ApiModelRepository'
import { type ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'

export interface UseModel {
  models: ModelPrimitives[]
  loading: boolean
  error: Error | null
  createModel: (formData: ModelPrimitives) => Promise<void>
  getModel: ModelGetter
}
export const useModel = (): UseModel => {
  const repository = new ApiModelRepository()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [models, setModels] = useState<ModelPrimitives[]>([])

  async function createModel(formData: ModelPrimitives) {
    const data = await new ModelCreator(repository).create(formData)
    getModels()
    return data
  }

  function getModels() {
    setLoading(true)
    new AllModelGetter(repository)
      .get()
      .then((model) => {
        setModels(model)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  const getModel = new ModelGetter(repository)

  useEffect(() => {
    getModels()

    return () => {
      setModels([])
    }
  }, [])

  return {
    models,
    loading,
    error,
    createModel,
    getModel
  }
}
