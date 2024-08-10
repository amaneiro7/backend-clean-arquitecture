import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import debounce from 'just-debounce-it'

import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type FiltersPrimitives } from '../../../modules/shared/domain/criteria/Filter'
import { type InputData, useDefaultInitialInputValue } from './defaultParams'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useDeviceContext } from '../../Context/DeviceProvider'



export const useInputsData = (): {
  inputData: InputData
  loading: boolean
  devices: DevicePrimitives[]
  handleChange: (name: string, value: string, operator?: Operator) => void
  handleClear: () => void
} => {
  const { devices, loading, addFilter, cleanFilters, defaultCategoryQuery } = useDeviceContext()
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue(defaultCategoryQuery)
  const [inputData, setInputData] = useState<InputData>(initialInputData)
  const { "1": setSearchParams } = useSearchParams()

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

  const handleClear = () => {
    setSearchParams('')
    setInputData(defaultInputData)
    cleanFilters()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetDevices = useCallback(
    debounce((query: SearchByCriteriaQuery) => {
      addFilter(query)
    }, 500), [])

  const handleChange = useCallback((name: string, value: string, operator?: Operator) => {
    setInputData({ ...inputData, [name]: value })

    const filters: FiltersPrimitives[] = [{
      field: name,
      operator: operator ?? Operator.EQUAL,
      value
    }]
    debounceGetDevices({ filters })

    updateInputData(name, value)
  }, [debounceGetDevices, inputData, updateInputData])


  return {
    inputData,
    devices,
    loading,
    handleChange,
    handleClear
  }
}
