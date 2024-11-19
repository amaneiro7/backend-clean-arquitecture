import { lazy } from "react"

import { useInputsData } from "../../../components/ListComponent/useInputData"
import { useDefaultInitialInputValue } from "./defaultParams"
import { type DevicesApiResponse } from "../../../../modules/shared/domain/types/responseTypes"
import { useDeviceContext } from "../../../Context/DeviceProvider"

const ListWrapper = lazy(() => import("../../../components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper})))
const MainComputerFilter = lazy(async () => import("../../../components/ListComponent/MainComputerFilter").then(m => ({ default: m.MainComputerFilter })))
const DeviceTable = lazy(() => import("../DeviceDefaultTable").then(m => ({ default: m.DefaultDeviceTable })))


export default function ListPrinters() {        
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { devices, total, loading, addFilter, cleanFilters, query } = useDeviceContext()
  const { inputData, handleChange, handleClear } = useInputsData({ initialInputData, defaultInputData, addFilter, cleanFilters })
  
    return (      
      <ListWrapper
        total={total}
        title='Lista de impresoras'
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
        table={<DeviceTable devices={devices as DevicesApiResponse[]} />}
      />         
    )
}
