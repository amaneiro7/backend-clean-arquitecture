import { useCallback, useState, useTransition } from 'react'
import debounce from 'just-debounce-it'
import { useSearchParams } from 'react-router-dom'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useDevice } from '../../Hooks/device/useDevice'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { defaultInitialInputValue, type InputData, defaultInputData } from './defaultParams'
import { defaultCategoryQuery } from './defaultCategoryQuery'
import { FiltersPrimitives } from '../../../modules/shared/domain/criteria/Filter'


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
  const { "1": setSearchParams } = useSearchParams()
  const { devices, loading, addFilter, cleanFilters } = useDevice(query)
  const [isPending, startTransition] = useTransition()

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
    setInputData(defaultInputData)
    cleanFilters(defaultCategoryQuery)
  }, [cleanFilters, setSearchParams])

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
      updateInputData(name, value)
    })
  }, [inputData, updateInputData, debounceGetDevices, addFilter])


  return {
    inputData,
    devices,
    loading,
    isPending,
    handleChange,
    handleClear
  }
}
