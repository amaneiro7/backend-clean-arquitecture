import { useSearchParams } from 'react-router-dom'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type ModelId } from '../../../modules/devices/model/domain/ModelId'

export interface InputData {
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  statusId: Primitives<StatusId>
  activo: Primitives<DeviceActivo>
  serial: Primitives<DeviceSerial>
  modelId: Primitives<ModelId>
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
  const statusId = searchParams.get('statusId') ?? ''
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
    statusId: statusId ?? '',
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
