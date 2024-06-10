import { useCallback, useState, useTransition } from 'react'
import debounce from 'just-debounce-it'

import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useDevice } from '../../Hooks/device/useDevice'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { defaultInitialInputValue, type InputData, defaultInputData } from './defaultParams'
import { defaultCategoryQuery } from './defaultCategoryQuery'
import { FiltersPrimitives } from '../../../modules/shared/domain/criteria/Filter'
import { cleanSearchParams, updateSearchParams } from '../../utils/updateInputQueryParams'


export const useInputsData = (): {
  inputData: InputData
  loading: boolean
  devices: DevicePrimitives[]
  isPending: boolean
  handleChange: (name: string, value: string, operator?: Operator) => void
  handleClear: () => void
} => {
  const { inputData: initialInputData, query, } = defaultInitialInputValue(defaultCategoryQuery)
  const [inputData, setInputData] = useState<InputData>(initialInputData)
  const { devices, loading, addFilter, cleanFilters } = useDevice(query)
  const [isPending, startTransition] = useTransition()

  const handleClear = useCallback(() => {
    cleanSearchParams()
    setInputData(defaultInputData)
    cleanFilters(defaultCategoryQuery)
  }, [cleanFilters, cleanSearchParams])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetDevices = useCallback(
    debounce((query: SearchByCriteriaQuery) => {
      addFilter(query)
    }, 300)
    , [addFilter])

  const handleChange = useCallback(async (name: string, value: string, operator?: Operator) => {
    startTransition(() => {
      setInputData({ ...inputData, [name]: value })

      let filters: FiltersPrimitives[]
      if (name === 'categoryId') {
        filters = value ? [{ field: name, operator: Operator.EQUAL, value }] : defaultCategoryQuery.filters
      } else {
        filters = [{
          field: name,
          operator: operator ?? Operator.EQUAL,
          value
        }]
      }


      if (name === 'serial' || name === 'activo') {
        debounceGetDevices({ filters })
      } else {
        addFilter({ filters })
      }
      updateSearchParams({ name, value })
    })
  }, [inputData, updateSearchParams, debounceGetDevices, addFilter])


  return {
    inputData,
    devices,
    loading,
    isPending,
    handleChange,
    handleClear
  }
}
