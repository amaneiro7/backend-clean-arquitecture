import { createContext, useContext, useEffect, useMemo } from "react"
import { useSearchDevice } from "../Hooks/device/useSearchDevice"
import { useCreateDevice } from "../Hooks/device/useCreateDevices"
import { type DevicePrimitives } from "../../modules/devices/devices/devices/domain/Device"
import { type SearchByCriteriaQuery } from "../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import { useSearchByCriteriaQuery } from "../Hooks/useQueryUpdate"
import { CategoryId } from "../../modules/devices/category/domain/CategoryId"
import { Operator } from "../../modules/shared/domain/criteria/FilterOperators"


export interface DeviceContextState {
  devices: DevicePrimitives[]
  error: string
  loading: boolean
  createDevice: (formData: DevicePrimitives) => Promise<void>
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: () => void
  query: SearchByCriteriaQuery
  defaultCategoryQuery: SearchByCriteriaQuery
  defaultCategoryList: Monitor | Computer | Parts | Printer | FinantialPrinter
}

interface List {
  computer: Computer
  monitor: Monitor
  parts: Parts
  printer: Printer
  finantialPrinter: FinantialPrinter
}

export type LocationProps = 'computer' | 'monitor' | 'printer' | 'finantialPrinter' | 'parts'

type Monitor = ('5')[]
type Computer = ('1' | '2' | '3' | '4')[]
type Parts = ('9' | '10' | '11' | '12' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25')[]
type Printer = ('13' | '7' | '8')[]
type FinantialPrinter = ('6')[]


export const DeviceContext = createContext({} as DeviceContextState)

export const DeviceContextProvider = ({ children, location }: React.PropsWithChildren<{ location?: LocationProps }>) => {
  const list: List = useMemo(() => {
    return {
      computer: [CategoryId.categoryOptions.COMPUTER, CategoryId.categoryOptions.LAPTOP, CategoryId.categoryOptions.ALLINONE, CategoryId.categoryOptions.SERVER],
      monitor: [CategoryId.categoryOptions.MONITOR],
      parts: [
        CategoryId.categoryOptions.HARDDRIVE,
        CategoryId.categoryOptions.KEYBOARD,
        CategoryId.categoryOptions.MOUSE,
        CategoryId.categoryOptions.BAM,
        CategoryId.categoryOptions.PHONE,
        CategoryId.categoryOptions.SCANNER,
        CategoryId.categoryOptions.ANTENAS,
        CategoryId.categoryOptions.CABLEUSB,
        CategoryId.categoryOptions.CAMARAS,
        CategoryId.categoryOptions.IPAD,
        CategoryId.categoryOptions.WEBCAM,
        CategoryId.categoryOptions.CORNETAS,
        CategoryId.categoryOptions.DOCKING,
        CategoryId.categoryOptions.LAPIZOPTICO,
        CategoryId.categoryOptions.CONVERTIDORVGAHDMI,
        CategoryId.categoryOptions.MIC,
      ],
      printer: [CategoryId.categoryOptions.LASERPRINTER, CategoryId.categoryOptions.INKPRINTER, CategoryId.categoryOptions.MFP],
      finantialPrinter: [CategoryId.categoryOptions.FINANTIALPRINTER]
    }
  }, [])

  const defaultCategoryList = useMemo(() => {
    return list[location] ?? []
  }, [list, location])

  const defaultCategoryQuery: SearchByCriteriaQuery = useMemo(() => {
    return { filters: [...defaultCategoryList.map(id => ({ field: 'categoryId', operator: Operator.EQUAL, value: id }))] }
  }, [defaultCategoryList])

  const { devices, error, loading, searchDevices, resetDevices } = useSearchDevice()
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
      error,
      loading,
      createDevice: handleCreate,
      addFilter,
      cleanFilters,
      query,
      defaultCategoryList,
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