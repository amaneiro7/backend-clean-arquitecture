import { lazy } from "react"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useDeviceContext } from "../../../Context/DeviceProvider"
import { useInputsData } from "../../../components/ListComponent/useInputData"

import { type DevicesApiResponse } from "../../../../modules/shared/domain/types/responseTypes"


const ListWrapper = lazy(() => import("../../../components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper})))
const MainComputerFilter = lazy(async () => import("../../../components/ListComponent/MainComputerFilter").then(m => ({ default: m.MainComputerFilter })))
const DefaultFilterSection = lazy(() => import("../../../components/ListComponent/DefaultFilter").then(m => ({ default: m.DefaultFilterSection})))
const OtherComputerFilter = lazy(() => import("../../../components/ListComponent/OtherComputerFilter").then(m => ({ default: m.OtherComputerFilter})))
const DeviceTable = lazy(() => import("./DeviceTable").then(m => ({ default: m.DeviceTable})))

export default function ListComputer() {        
    const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
    const { devices, loading, addFilter, cleanFilters } = useDeviceContext()
    const { inputData, handleChange, handleClear } = useInputsData({ initialInputData, defaultInputData, addFilter, cleanFilters })

    const handleDownload = async () => {
      const clearDataset = await import('../../../utils/clearComputerDataset')
      .then(m => m.clearComputerDataset({devices: devices as DevicesApiResponse[]}))
      await import('../../../utils/downloadJsonToExcel').then(m => m.jsonToExcel({clearDataset}))      
  }
  console.log('listComputer', devices)
    return (      
      <ListWrapper
        data={devices}
        title='Lista de equipos de computación'
        url='/device/add'
        loading={loading}
        handleChange={handleChange}
        handleClear={handleClear}
        handleDownload={handleDownload}
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
        otherFilter={
          <>
            <DefaultFilterSection 
              activo={inputData.activo}
              statusId={inputData.statusId}
              brandId={inputData.brandId}
              modelId={inputData.modelId}
              categoryId={inputData.categoryId}
              stateId={inputData.stateId}
              regionId={inputData.regionId}
              cityId={inputData.cityId}
              handleChange={handleChange}
            />  
            <OtherComputerFilter
              handleChange={handleChange}
              computerName={inputData.computerName}
              operatingSystemId={inputData.operatingSystemId}
              operatingSystemArqId={inputData.operatingSystemArqId}
              processor={inputData.processor}
              ipAddress={inputData.ipAddress}
            />
          </>
      }
        table={<DeviceTable devices={devices as DevicesApiResponse[]} />}
      />
    )
}