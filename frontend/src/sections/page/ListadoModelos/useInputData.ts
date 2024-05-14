import { useSearchParams } from 'react-router-dom'
import { ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'

export interface InputData extends Partial<ModelPrimitives> { }

type UpdateInputData = ({ name, value }: inputDataType) => void
interface inputDataType {
  name: string
  value: string
}

export const useInputsData = (): {
  inputData: InputData
  updateInputData: UpdateInputData
  clearInputs: () => void
} => {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateInputData = ({ name, value }: inputDataType) => {
    if (value === '') {
      setSearchParams(prev => {
        prev.delete(name)
        return prev
      })
    } else {
      setSearchParams(prev => {
        prev.set(name, value)
        return prev
      })
    }
  }

  const clearInputs = () => {
    setSearchParams('')
  }

  const inputData = {
    name: searchParams.get('name') ?? ''
  }

  return {
    inputData,
    updateInputData,
    clearInputs
  }
}
