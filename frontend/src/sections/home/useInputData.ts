import { useSearchParams } from 'react-router-dom'
import { type CategoryId } from '../../modules/devices/category/domain/CategoryId'
import { type Primitives } from '../../modules/shared/domain/value-object/Primitives'

export interface InputData {
  categoryId: Primitives<CategoryId>
  brandId: string
  statusId: number | ''
  activo: string
  serial: string
  modelId: string
}

type UpdateInputData = (field: string, value: string | number) => void

export const useInputsData = (): {
  inputData: InputData
  updateInputData: UpdateInputData
  clearInputs: () => void
} => {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = searchParams.get('categoryId') ?? ''
  const brandId = searchParams.get('brandId') ?? ''
  const statusId = Number(searchParams.get('statusId')) ?? ''
  const activo = searchParams.get('activo') ?? ''
  const serial = searchParams.get('serial') ?? ''
  const modelId = searchParams.get('modelId') ?? ''

  const updateInputData = (field: string, value: string | number) => {
    if (value === '') {
      setSearchParams(prev => {
        prev.delete(field)
        return prev
      })
    } else {
      setSearchParams(prev => {
        prev.set(field, String(value))
        return prev
      })
    }
  }

  const clearInputs = () => {
    setSearchParams('')
  }

  const inputData = {
    categoryId: categoryId ?? '',
    brandId: brandId ?? '',
    statusId: statusId === 0 ? '' : statusId,
    activo: activo ?? '',
    serial: serial ?? '',
    modelId: modelId ?? ''
  }

  return {
    inputData,
    updateInputData,
    clearInputs
  }
}
