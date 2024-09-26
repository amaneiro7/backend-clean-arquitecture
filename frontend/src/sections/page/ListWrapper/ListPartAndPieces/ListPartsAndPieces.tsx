import { lazy } from "react"

import { useInputsData } from "@/sections/components/ListComponent/useInputData"
import { useDefaultInitialInputValue } from "./defaultParams"
import { type DevicesApiResponse } from "@/sections/../modules/shared/domain/types/responseTypes"
import { useDeviceContext } from "@/sections/Context/DeviceProvider"

const ListWrapper = lazy(() => import("@/sections/components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper })))
const MainComputerFilter = lazy(async () => import("@/sections/components/ListComponent/MainComputerFilter").then(m => ({ default: m.MainComputerFilter })))
const DeviceTable = lazy(() => import("../DeviceTable").then(m => ({ default: m.DeviceTable })))


export default function ListPartsAndPieces() {
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { devices, loading, addFilter, cleanFilters } = useDeviceContext()
  const { inputData, handleChange, handleClear } = useInputsData({ initialInputData, defaultInputData, addFilter, cleanFilters })

  const handleDownload = async () => {
    const clearDataset = await import('@/sections/utils/clearComputerDataset')
      .then(m => m.clearComputerDataset({ devices: devices as DevicesApiResponse[] }))
    await import('@/sections/utils/downloadJsonToExcel').then(m => m.jsonToExcel({ clearDataset }))
  }
  return (
    <ListWrapper
      data={devices}
      title='Lista de partes y piezas'
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
      table={<DeviceTable devices={devices as DevicesApiResponse[]} />}
    />
  )
}
