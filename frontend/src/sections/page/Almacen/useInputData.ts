import { useSearchParams } from 'react-router-dom'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type ModelId } from '../../../modules/devices/model/domain/ModelId'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'

export interface InputData {
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  statusId: Primitives<StatusId>
  activo: Primitives<DeviceActivo>
  serial: Primitives<DeviceSerial>
  modelId: Primitives<ModelId>
  locationId: Primitives<LocationId>
}

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
    categoryId: searchParams.get('categoryId') ?? '',
    brandId: searchParams.get('brandId') ?? '',
    statusId: searchParams.get('statusId') ?? '',
    activo: searchParams.get('activo') ?? '',
    serial: searchParams.get('serial') ?? '',
    modelId: searchParams.get('modelId') ?? '',
    locationId: searchParams.get('locationId') ?? ''    
  }

  return {
    inputData,
    updateInputData,
    clearInputs
  }
}
