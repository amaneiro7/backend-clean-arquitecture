import { useSearchParams } from 'react-router-dom'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type ModelId } from '../../../modules/devices/model/domain/ModelId'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { DeviceEmployee } from '../../../modules/devices/devices/devices/domain/DeviceEmployee'
import { SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

export interface InputData {
  employeeId: Primitives<DeviceEmployee>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  statusId: Primitives<StatusId>
  activo: Primitives<DeviceActivo>
  serial: Primitives<DeviceSerial>
  modelId: Primitives<ModelId>
  locationId: Primitives<LocationId>
}

type UpdateInputData = (params: inputDataType) => void
interface inputDataType {
  field: string
  value: string
  operator?: string
  query?: SearchByCriteriaQuery
}

export const useInputsData = (): {
  inputData: InputData
  updateInputData: UpdateInputData
  clearInputs: () => void
} => {
  const [searchParams, setSearchParams] = useSearchParams()  

  const updateInputData = ({ field, value, query }: inputDataType) => {
    if (value === '') {
      setSearchParams(prev => {
        prev.delete(field)
        return prev
      })
    } else {

      query.filters.length > 0 && query.filters.forEach(
        ({field, operator, value}, index) => {
          setSearchParams(prev => {
            prev.set(`filters[${index}][field]`, field)
            prev.set(`filters[${index}][operator]`, operator)
            prev.set(`filters[${index}][value]`, value)
            return prev
          })
        }
      )
      
      setSearchParams(prev => {
        prev.set(field, value)
        return prev
      })
    }
  }

  const clearInputs = () => {
    setSearchParams('')
  }

  const inputData = {
    employeeId: searchParams.get('employeeId') ?? '',
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
