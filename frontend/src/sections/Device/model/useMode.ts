import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'
import { Uuid } from '../../../modules/shared/domain/value-object/Uuid'
import { AllModelGetter } from '../../../modules/devices/model/application/AllModelGetter'
import { type ModelPrimitives } from '../../../modules/devices/model/domain/Model'
import { ModelCreator } from '../../../modules/devices/model/application/ModelCreator'

export const useModel = (repository: Repository) => {
  const allModelGetter = new AllModelGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [models, setModels] = useState<ModelPrimitives[]>([])

  async function createModel ({ name, categoryId, brandId }: { name: string, categoryId: number, brandId: string }) {
    const modelCreator = new ModelCreator(repository)
    const id = Uuid.random().value
    await modelCreator.create({ id, name, categoryId, brandId })
    getModels()
  }

  function getModels () {
    setLoading(true)
    allModelGetter
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
    createModel
  }
}
