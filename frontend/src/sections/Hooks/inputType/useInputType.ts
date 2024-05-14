import { useEffect, useState } from 'react'
import { InputTypePrimitives } from '../../../modules/devices/model/InputType/domain/InputType'
import { AllInputTypeGetter } from '../../../modules/devices/model/InputType/application/AllInputTypeGetter'
import { ApiInputTypeRepository } from '../../../modules/devices/model/InputType/infra/ApiInputTypeRepository'


export interface UseInputType {
  inputType: InputTypePrimitives[]
  loading: boolean
  error: Error | null
}

export const useInputType = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inputType, setInputType] = useState<InputTypePrimitives[]>([])

  function getInputType() {
    setLoading(true)
    new AllInputTypeGetter(new ApiInputTypeRepository())
      .get()
      .then((res) => {
        setInputType(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getInputType()

    return () => {
      setInputType([])
    }
  }, [])

  return {
    inputType,
    loading,
    error
  }
}
