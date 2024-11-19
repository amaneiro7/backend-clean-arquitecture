import { lazy, Suspense } from "react"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useInputsData } from "@/sections/components/ListComponent/useInputData"
import { useDeviceContext } from "@/sections/Context/DeviceProvider"
import { type DevicesApiResponse } from "@/modules/shared/domain/types/responseTypes"

const ListWrapper = lazy(() => import("../../../components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper})))
const MainComputerFilter = lazy(async () => import("../../../components/ListComponent/MainComputerFilter").then(m => ({ default: m.MainComputerFilter })))
const DeviceTable = lazy(() => import("../DeviceDefaultTable").then(m => ({ default: m.DefaultDeviceTable })))


export default function ListMonitor() {
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { devices, total, loading, addFilter, cleanFilters, query } = useDeviceContext()
  const { inputData, handleChange, handleClear } = useInputsData({ initialInputData, defaultInputData, addFilter, cleanFilters })
  
    return (
      <Suspense>
        <ListWrapper
          total={total}
          title='Lista de monitores'
          url='/device/add'
          loading={loading}
          handleChange={handleChange}
          handleClear={handleClear}
          query={query}
          typeOfSiteId={inputData.typeOfSiteId}
          mainFilter={
            <MainComputerFilter 
              handleChange={handleChange}
              categoryId={inputData.categoryId}
              employeeId={inputData.employeeId}
              locationId={inputData.locationId}
              regionId={inputData.regionId}
              serial={inputData.serial}
              typeOfSiteId={inputData.typeOfSiteId}
            />
          }
          table={<Suspense><DeviceTable devices={devices as DevicesApiResponse[]} /></Suspense>}
        />
      </Suspense>
    )
}