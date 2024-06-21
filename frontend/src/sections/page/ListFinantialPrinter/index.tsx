import { lazy, Suspense, useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInputsData } from "./useInputData"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"

const Main = lazy(async () => import("../../components/Main"))
const PageTitle = lazy(async () => import("../../components/PageTitle"))
const DeviceTable = lazy(async () => import("../../components/defaultListPage/DefaultDeviceTable").then((m) => ({ default: m.DeviceTable })))
const FilterSection = lazy(async () => import("../../components/defaultListPage/DefaultFIlterSection").then((m) => ({ default: m.FilterSection })))
const ButtonSection = lazy(async () => import("../../components/buttonsection/ButtonSection").then((m) => ({ default: m.ButtonSection })))
const TypeOfSiteTabNav = lazy(async () => import("../../components/tabs/TypeOfSiteTabNav").then((m) => ({ default: m.TypeOfSiteTabNav })))

export default function ListFinantialPrinter() {
  const tableRef = useRef(null)
  const navigate = useNavigate()
  const { inputData, devices, handleChange, handleClear, loading } = useInputsData()
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenFIlterSidebar = useCallback(() => {
    setOpen(!open)
  }, [open])

  const handleAdd = useCallback(() => {
    navigate("/device/add")
  }, [navigate])

  const handleDownload = async () => {
    const clearDataset = await import('../../utils/clearComputerDataset')
      .then(m => m.clearComputerDataset({devices: devices as DevicesApiResponse[]}))
    await import('../../utils/downloadJsonToExcel').then(m => m.jsonToExcel({clearDataset}))
  }

  return (    
    <Main>
        
      <PageTitle title='Lista de impresoras Financieras' optionalText={`${devices.length} resultados`} />
        

      <FilterSection handleChange={handleChange} handleOpenFIlterSidebar={handleOpenFIlterSidebar} open={open} inputData={inputData} />
        
      <ButtonSection handleExportToExcel={handleDownload} handleAdd={handleAdd} handleFilter={handleOpenFIlterSidebar} handleClear={handleClear} />
        

      <Suspense fallback={<div className='min-h-7 h-7' />}>
        <TypeOfSiteTabNav onChange={handleChange} value={inputData.typeOfSiteId} />
      </Suspense>

      {loading && <SpinnerSKCircle />}
        
      <DeviceTable ref={tableRef} loading={loading} devices={devices} />
        
    </Main>
    
  )
}
