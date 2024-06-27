import { useSearchParams } from 'react-router-dom'
import { ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'
import { useModelByCriteria } from '../../Hooks/model/useModelByCriteria'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

export interface InputData extends Partial<ModelPrimitives> { }
interface inputDataType {
  name: string
  value: string
}

export const useInputsData = (): {
  inputData: InputData
  loading: boolean
  models: ModelPrimitives[]
  handleChange: (name: string, value: string, operator?: Operator) => void
  handleClear: () => void
} => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { models, loading, addFilter, cleanFilters } = useModelByCriteria()

  const updateInputData = ({ name, value }: inputDataType) => {
    setSearchParams(prev => {
      if (value === '') {
        prev.delete(name)
      } else {
        prev.set(name, value)
      }
      return prev
    })
  }


  const handleChange = (name: string, value: string, operator?: Operator) => {
    const filters = [{
      field: name,
      operator: operator ?? Operator.EQUAL,
      value
    }]
    updateInputData({ name, value })
    addFilter({ filters })
  }


  const handleClear = () => {
    setSearchParams('')
    cleanFilters({
      filters: []
    })
  }

  const inputData = {
    id: searchParams.get('id') ?? '',
    categoryId: searchParams.get('categoryId') ?? '',
    brandId: searchParams.get('brandId') ?? '',
  }

  return {
    inputData,
    loading,
    models,
    handleChange,
    handleClear
  }
}
