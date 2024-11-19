import { createContext, useContext, useEffect, useMemo } from "react"
import { useSearchDevice } from "../Hooks/device/useSearchDevice"
import { useCreateDevice } from "../Hooks/device/useCreateDevices"
import { useSearchByCriteriaQuery } from "../Hooks/useQueryUpdate"
import { MainCategoryList } from "@/modules/devices/mainCategory/domain/MainCategoryList"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { type SearchByCriteriaQuery } from "@/modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import { type DevicePrimitives } from "@/modules/devices/devices/devices/domain/Device"



export interface DeviceContextState {
  devices: DevicePrimitives[]
  total: number
  error: string
  loading: boolean
  createDevice: (formData: DevicePrimitives) => Promise<void>
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: () => void
  query: SearchByCriteriaQuery
  defaultCategoryQuery: SearchByCriteriaQuery
  defaultMainCategory: typeof MainCategoryList[keyof typeof MainCategoryList]
}

interface List {
  computer: Computer
  monitor: Monitor
  parts: Parts
  printer: Printer
  finantialPrinter: FinantialPrinter
}

export type LocationProps = 'computer' | 'monitor' | 'printer' | 'finantialPrinter' | 'parts'

type Computer = typeof MainCategoryList['COMPUTER']
type Monitor = typeof MainCategoryList['SCREENS']
type Parts = typeof MainCategoryList['PARTS']
type Printer = typeof MainCategoryList['PRINTERS']
type FinantialPrinter = typeof MainCategoryList['PRINTERS']


export const DeviceContext = createContext({} as DeviceContextState)

export const DeviceContextProvider = ({ children, location }: React.PropsWithChildren<{ location?: LocationProps }>) => {
  const list: List = useMemo(() => {
    return {
      computer: MainCategoryList.COMPUTER,
      monitor: MainCategoryList.SCREENS,
      parts: MainCategoryList.PARTS,
      printer: MainCategoryList.PRINTERS,
      finantialPrinter: MainCategoryList.PRINTERS
    }
  }, [])

  const defaultMainCategory = useMemo(() => {
    return list[location]
  }, [list, location])

  const defaultCategoryQuery: SearchByCriteriaQuery = useMemo(() => {
    return { filters: [{ field: 'mainCategoryId', operator: Operator.EQUAL, value: defaultMainCategory }], limit: 25, offset: 1 }
  }, [defaultMainCategory])

  const { devices, total, error, loading, searchDevices, resetDevices } = useSearchDevice()
  const { addFilter, cleanFilters, query } = useSearchByCriteriaQuery(defaultCategoryQuery)
  const { createDevice } = useCreateDevice()

  const handleCreate = async (formData: DevicePrimitives) => {
    const res = await createDevice(formData)
    searchDevices(query)
    return res
  }

  useEffect(() => {
    searchDevices(query)
    return () => {
      resetDevices()
    }
  }, [query, resetDevices, searchDevices])

  return (
    <DeviceContext.Provider value={{
      devices,
      total,
      error,
      loading,
      createDevice: handleCreate,
      addFilter,
      cleanFilters,
      query,
      defaultMainCategory,
      defaultCategoryQuery
    }}
    >
      {children}
    </DeviceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDeviceContext = () => {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error("useDeviceContext must be used within a DeviceContextProvider")
  }
  return context
}