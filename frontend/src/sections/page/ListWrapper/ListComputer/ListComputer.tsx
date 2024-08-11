import { lazy } from "react"

import { useInputsData } from "../../../components/ListComponent/useInputData"
import { useDefaultInitialInputValue } from "./defaultParams"
import { type DevicesApiResponse } from "../../../../modules/shared/domain/types/responseTypes"


const DeviceTable = lazy(() => import("./DeviceTable").then(m => ({ default: m.DeviceTable})))
const ListWrapper = lazy(() => import("../../../components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper})))
const OtherComputerFilter = lazy(() => import("../../../components/ListComponent/OtherComputerFilter").then(m => ({ default: m.OtherComputerFilter})))

export default function ListComputer() {        
    const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
    const { inputData, devices, handleChange, handleClear, loading } = useInputsData({ initialInputData, defaultInputData })

    return (      
      <ListWrapper
        devices={devices}
        title='Lista de equipos de computación'
        loading={loading}
        handleChange={handleChange}
        handleClear={handleClear}
        inputData={inputData}
        otherFilter={
          <OtherComputerFilter
            handleChange={handleChange}
            computerName={inputData.computerName}
            operatingSystemId={inputData.operatingSystemId}
            operatingSystemArqId={inputData.operatingSystemArqId}
            processor={inputData.processor}
            ipAddress={inputData.ipAddress}
          />
      }
        table={<DeviceTable devices={devices as DevicesApiResponse[]} />}
      />            
    )
}