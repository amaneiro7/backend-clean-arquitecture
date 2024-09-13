import { lazy, Suspense } from "react"
import { useInputsData } from "@/sections/components/ListComponent/useInputData"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useDeviceContext } from "@/sections/Context/DeviceProvider"
import { type DevicesApiResponse } from "@/sections/../modules/shared/domain/types/responseTypes"

const ListWrapper = lazy(() => import("@/sections/components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper})))
const MainComputerFilter = lazy(async () => import("@/sections/components/ListComponent/MainComputerFilter").then(m => ({ default: m.MainComputerFilter })))
const DeviceTable = lazy(() => import("../DeviceTable").then(m => ({ default: m.DeviceTable })))

export default function ListFinantialPrinter() {        
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { devices, loading, addFilter, cleanFilters } = useDeviceContext()
  const { inputData, handleChange, handleClear } = useInputsData({ initialInputData, defaultInputData, addFilter, cleanFilters })
  
  const handleDownload = async () => {
    const clearDataset = await import('@/sections/utils/clearComputerDataset')
    .then(m => m.clearComputerDataset({devices: devices as DevicesApiResponse[]}))
    await import('@/sections/utils/downloadJsonToExcel').then(m => m.jsonToExcel({clearDataset}))      
  }
    return (    
      <Suspense>
        <ListWrapper
          data={devices}
          title='Lista de impresoras Financieras'
          url='/device/add'
          loading={loading}
          handleChange={handleChange}
          handleClear={handleClear}
          handleDownload={handleDownload}
          typeOfSiteId={inputData.typeOfSiteId}
          mainFilter={
            <Suspense>
              <MainComputerFilter 
                handleChange={handleChange}
                categoryId={inputData.categoryId}
                employeeId={inputData.employeeId}
                locationId={inputData.locationId}
                regionId={inputData.regionId}
                serial={inputData.serial}
                typeOfSiteId={inputData.typeOfSiteId}
              />  
            </Suspense>
          }
          table={<Suspense><DeviceTable devices={devices as DevicesApiResponse[]} /></Suspense>}
        />
      </Suspense>  
    )}