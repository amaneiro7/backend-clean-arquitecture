import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'
import { InputTypePrimitives } from '../../../modules/devices/model/InputType/domain/InputType'
import { AllInputTypeGetter } from '../../../modules/devices/model/InputType/application/AllInputTypeGetter'


export interface UseInputType {
  inputType: InputTypePrimitives[]
  loading: boolean
  error: Error | null
}

export const useInputType = (repository: Repository) => {
  const allInputTypeGetter = new AllInputTypeGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inputType, setInputType] = useState<InputTypePrimitives[]>([])

  function getInputType () {
    setLoading(true)
    allInputTypeGetter
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
