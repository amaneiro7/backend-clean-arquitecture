import { useCallback, useReducer } from 'react'
import debounce from 'just-debounce-it'
import { useSearchParams } from 'react-router-dom'

import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
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
import { type ComputerName } from '../../../modules/devices/fetures/computer/domain/ComputerName'
import { type OperatingSystemId } from '../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystemId'
import { type OperatingSystemArqId } from '../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { type ProcessorId } from '../../../modules/devices/fetures/processor/domain/ProcessorId'
import { type IPAddress } from '../../../modules/devices/fetures/computer/domain/IPAddress'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type DeviceEmployee } from '../../../modules/devices/devices/devices/domain/DeviceEmployee'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useDevice } from '../../Hooks/device/useDevice'

const initialState = {
  inputData: {
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
    regionId: '',
    computerName: '',
    operatingSystem: '',
    operatingSystemArq: '',
    processorId: '',
    ipAddress: '',
  },
  query: {
    filters: [
      { field: 'categoryId', operator: Operator.EQUAL, value: '1' },
      { field: 'categoryId', operator: Operator.EQUAL, value: '2' },
      { field: 'categoryId', operator: Operator.EQUAL, value: '3' },
      { field: 'categoryId', operator: Operator.EQUAL, value: '4' },
    ]
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
  computerName: Primitives<ComputerName>
  operatingSystem: Primitives<OperatingSystemId>
  operatingSystemArq: Primitives<OperatingSystemArqId>
  processorId: Primitives<ProcessorId>
  ipAddress: Primitives<IPAddress>
}

type Action =
  | { type: 'INIT_STATE', payload: { inputData?: InputData, query?: SearchByCriteriaQuery } }
  | { type: 'UPDATE_FILTER', payload: { query: SearchByCriteriaQuery } }
  | { type: 'CLEAR_FILTER' }


interface State {
  inputData: InputData,
  query: SearchByCriteriaQuery
}

const reducer = (state: State, action: Action) => {
  if (action.type === 'INIT_STATE') {
    return { ...state, inputData: action.payload.inputData, query: action.payload.query }
  }
  if (action.type === 'UPDATE_FILTER') {
    const { query } = action.payload
    const params = new URLSearchParams(window.location.search)
    console.log('state', initialState.inputData)
    // Obtener las llaves del initialState InputData
    const inputDataArray = Object.keys(initialState.inputData)
    console.log('inputDataArray', inputDataArray)
    // Obtener el valor de los parametros searchParam, si no existe que ese valor sea 0
    const inputData = inputDataArray.map(key => {      
      return { [key]: params.get(key) ?? '' }
    }).reduce((obj, item) => {
      const key = Object.keys(item)[0]
      const value = item[key]
      obj[key] = value
      return obj
    }, {})
    console.log('inputData', inputData)
    return { ...state, inputData, query }
  }
  if (action.type === 'CLEAR_FILTER') {
    return initialState
  }
}

interface inputDataType {
  name: string
  value: string
}

export const useInputsData = (): {
  inputData: InputData
  loading: boolean
  devices: DevicePrimitives[]
  handleChange: (name: string, value: string, operator?: Operator) => void
  handleClear: () => void
} => {
  const [{ inputData, query: defaultQuery }, dispatch] = useReducer(reducer, initialState)
  const [_, setSearchParams] = useSearchParams()
  const { query, devices, loading, addFilter, cleanFilters } = useDevice(defaultQuery)

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
      }, { replace: true })
    }
  }

  const clearInputs = () => {
    setSearchParams('')
  }

  const debounceGetDevices = useCallback(
    debounce((query: SearchByCriteriaQuery) => {
      addFilter(query)
    }, 300)
    , [addFilter]
  )

  const handleChange = (name: string, value: string, operator?: Operator) => {
    const filters = [{
      field: name,
      operator: operator ?? Operator.EQUAL,
      value
    }]
    dispatch({ type: 'UPDATE_FILTER', payload: { query } })
    updateInputData({ name, value })
    debounceGetDevices({ filters })
  }

  const handleClear = () => {
    clearInputs()
    cleanFilters(defaultQuery)
  }


  return {
    inputData,
    devices,
    loading,
    handleChange,
    handleClear
  }
}
