import { useCallback, useReducer } from 'react'
import debounce from 'just-debounce-it'
import { useSearchParams } from 'react-router-dom'
import { getValueFromQueryParams } from '../../utils/getValueFromQueryParams'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useDevice } from '../../Hooks/device/useNewDevice'
import { createFilterFromQueryParams } from '../../utils/createFilterFromQueryParams'
import { CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { type TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'
import { type CityId } from '../../../modules/location/city/domain/CityId'
import { type StateId } from '../../../modules/location/state/domain/StateId'
import { type RegionId } from '../../../modules/location/region/domain/RegionId'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type DeviceEmployee } from '../../../modules/devices/devices/devices/domain/DeviceEmployee'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'


const defaultInputData = {
  categoryId: '',
  brandId: '',
  statusId: '',
  activo: '',
  serial: '',
  modelId: '',
  employeeId: '',
  locationId: '',
  typeOfSiteId: '',
  cityId: '',
  stateId: '',
  regionId: ''
}

const defaultQuery: SearchByCriteriaQuery = {
  filters: [
    ...[
      CategoryId.categoryOptions.FINANTIALPRINTER,
    ].map(id => ({ field: 'categoryId', operator: Operator.EQUAL, value: id })),
  ]
}

const initialState: State = (() => {
  const { inputData, query } = getInputDataAndQuery()
  return {
    inputData,
    query
  }
})()
function getInputDataAndQuery() {
  const { serial, activo, categoryId, ...resParams } = getValueFromQueryParams(defaultInputData)

  const resFilters = createFilterFromQueryParams(resParams)

  const filters = [
    serial && { field: 'serial', operator: Operator.CONTAINS, value: serial },
    activo && { field: 'activo', operator: Operator.CONTAINS, value: activo },
    ...resFilters,
    ...(!!categoryId ? [{ field: 'categoryId', operator: Operator.EQUAL, value: categoryId }] : defaultQuery.filters),
  ].filter(Boolean)

  return {
    inputData: { ...defaultInputData, serial, activo, categoryId, ...resParams },
    query: { filters },
  }
}

export interface InputData {
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  statusId: Primitives<StatusId>
  activo: Primitives<DeviceActivo>
  serial: Primitives<DeviceSerial>
  modelId: Primitives<ModelId>
  employeeId: Primitives<DeviceEmployee>
  locationId: Primitives<LocationId>
  typeOfSiteId: Primitives<TypeOfSiteId>
  cityId: Primitives<CityId>
  stateId: Primitives<StateId>
  regionId: Primitives<RegionId>
}

type Action =
  | { type: 'INIT_STATE', payload: { inputData?: InputData, query?: SearchByCriteriaQuery } }
  | { type: 'UPDATE_INPUTS', payload: { name: string, value: string } }
  | { type: 'UPDATE_FILTER' }
  | { type: 'CLEAR_FILTER' }


interface State {
  inputData: InputData,
  query: SearchByCriteriaQuery
}

const reducer = (state: State, action: Action) => {
  if (action.type === 'INIT_STATE') {
    return {
      ...state,
      inputData: action.payload.inputData,
      query: action.payload.query
    }
  }
  if (action.type === 'UPDATE_FILTER') {
    const { query } = getInputDataAndQuery()
    return {
      ...state,
      query
    }
  }
  if (action.type === 'UPDATE_INPUTS') {
    const { name, value } = action.payload
    return {
      ...state,
      inputData: { ...state.inputData, [name]: value },

    }
  }
  if (action.type === 'CLEAR_FILTER') {
    return {
      inputData: defaultInputData,
      query: defaultQuery
    }
  }
}

export const useInputsData = (): {
  inputData: InputData
  loading: boolean
  devices: DevicePrimitives[]
  handleChange: (name: string, value: string, operator?: Operator) => void
  handleClear: () => void
} => {
  const [{ inputData, query }, dispatch] = useReducer(reducer, initialState)
  const [_, setSearchParams] = useSearchParams()
  const { devices, loading, handleSync } = useDevice(query)


  const updateInputData = useCallback((name: string, value: string) => {
    setSearchParams(prev => {
      if (value === '') {
        prev.delete(name)
      } else {
        prev.set(name, value)
      }
      return prev
    })
  }, [setSearchParams])

  const handleClear = useCallback(() => {
    setSearchParams('')
    dispatch({ type: 'CLEAR_FILTER' })
    handleSync()
  }, [setSearchParams])

  const debounceGetDevices = useCallback(
    debounce(() => {
      handleSync()
    }, 300)
    , [handleSync]
  )

  const handleChange = useCallback((name: string, value: string) => {
    dispatch({ type: 'UPDATE_INPUTS', payload: { name, value } })
    updateInputData(name, value)
    dispatch({ type: 'UPDATE_FILTER' })
    if (name === 'serial' || name === 'activo') {
      debounceGetDevices()
    } else {
      handleSync()
    }
  }, [dispatch, updateInputData])


  return {
    inputData,
    devices,
    loading,
    handleChange,
    handleClear
  }
}
