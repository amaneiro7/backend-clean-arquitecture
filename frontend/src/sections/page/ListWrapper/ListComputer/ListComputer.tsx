import { lazy, Suspense } from "react"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useDeviceContext } from "@/sections/Context/DeviceProvider"
import { useInputsData } from "@/sections/components/ListComponent/useInputData"

import { type DevicesApiResponse } from "@/modules/shared/domain/types/responseTypes"
import { useDownloadExcelFromServer } from "@/sections/utils/downloadExcelfromServer"

const ListWrapper = lazy(() => import("@/sections/components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper })))
const MainComputerFilter = lazy(async () => import("@/sections/components/ListComponent/MainComputerFilter").then(m => ({ default: m.MainComputerFilter })))
const DefaultFilterSection = lazy(() => import("@/sections/components/ListComponent/DefaultFilter").then(m => ({ default: m.DefaultFilterSection })))
const OtherComputerFilter = lazy(() => import("@/sections/components/ListComponent/OtherComputerFilter").then(m => ({ default: m.OtherComputerFilter })))
const DeviceTable = lazy(() => import("./DeviceTable").then(m => ({ default: m.DeviceTable })))

export default function ListComputer() {
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { devices, loading, addFilter, cleanFilters, query } = useDeviceContext()
  const { inputData, handleChange, handleClear } = useInputsData({ initialInputData, defaultInputData, addFilter, cleanFilters })
  const { download, isDownloading } = useDownloadExcelFromServer({ query })

  const handleDownload = async () => {
    await download()
  }
  return (
    <Suspense>
      <ListWrapper
        data={devices}
        title='Lista de equipos de computación'
        url='/device/add'
        loading={loading}
        handleChange={handleChange}
        handleClear={handleClear}
        handleDownload={handleDownload}
        loadingDowload={isDownloading}
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
        otherFilter={
          <>
            <Suspense>
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
            </Suspense>
            <Suspense>
              <OtherComputerFilter
                handleChange={handleChange}
                computerName={inputData.computerName}
                operatingSystemId={inputData.operatingSystemId}
                operatingSystemArqId={inputData.operatingSystemArqId}
                processor={inputData.processor}
                ipAddress={inputData.ipAddress}
              />
            </Suspense>
          </>
        }
        table={<Suspense><DeviceTable devices={devices as DevicesApiResponse[]} /></Suspense>}
      />
    </Suspense>
  )
}