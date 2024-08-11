import { lazy } from "react"

import { useInputsData } from "../../../components/ListComponent/useInputData"
import { useDefaultInitialInputValue } from "./defaultParams"
import { type DevicesApiResponse } from "../../../../modules/shared/domain/types/responseTypes"


const DeviceTable = lazy(() => import("../DeviceTable").then(m => ({ default: m.DeviceTable })))
const ListWrapper = lazy(() => import("../../../components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper})))

export default function ListPrinter() {        
    const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
    const { inputData, devices, handleChange, handleClear, loading } = useInputsData({ initialInputData, defaultInputData })

    return (      
      <ListWrapper
        devices={devices}
        title='Lista de impresoras'
        loading={loading}
        handleChange={handleChange}
        handleClear={handleClear}
        inputData={inputData}
        table={<DeviceTable devices={devices as DevicesApiResponse[]} />}
      />            
    )
}