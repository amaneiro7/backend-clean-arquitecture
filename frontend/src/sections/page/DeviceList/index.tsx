import { lazy, Suspense, useState } from "react"
import { useNavigate } from "react-router-dom"
import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { useInputsData } from "./useInputData"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { defaultCategoryList } from "./defaultCategoryQuery"

const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/Typography/PageTitle'))
const FilterSection = lazy(async () => import('./FilterSection').then(m => ({ default: m.FilterSection })))
const ButtonSection = lazy(async () => import("../../components/buttonsection/ButtonSection").then((m) => ({ default: m.ButtonSection })))
const TypeOfSiteTabNav = lazy(async () => import("../../components/tabs/TypeOfSiteTabNav").then((m) => ({ default: m.TypeOfSiteTabNav })))
const DeviceTable = lazy(() => import("./DeviceTable").then(m => ({ default: m.DeviceTable})))

export default function DeviceList() {
    const navigate = useNavigate()
    const { inputData, devices, handleChange, handleClear, loading } = useInputsData()
    const [open, setOpen] = useState<boolean>(false)

    const handleOpenFIlterSidebar = () => {
          setOpen(!open)
      }

    const handleDownload = async () => {
        const clearDataset = await import('../../utils/clearComputerDataset')
          .then(m => m.clearComputerDataset({devices: devices as DevicesApiResponse[]}))
        await import('../../utils/downloadJsonToExcel').then(m => m.jsonToExcel({clearDataset}))      
      }
  
    const handleAdd = () => {
        navigate("/device/add")
      }
      
    return (      
      <Main>      
        <PageTitle title='Lista de equipos de computación' optionalText={!loading && `${devices.length} resultados`} />
      
        <FilterSection filterCategory={defaultCategoryList} open={open} handleChange={handleChange} handleOpenFIlterSidebar={handleOpenFIlterSidebar} inputData={inputData} />                
      
        <ButtonSection handleExportToExcel={handleDownload} handleAdd={handleAdd} handleFilter={handleOpenFIlterSidebar} handleClear={handleClear} />      
          
        <Suspense fallback={<div className='min-h-7 h-7' />}>
          <TypeOfSiteTabNav onChange={handleChange} value={inputData.typeOfSiteId} />
        </Suspense>          
          
        {loading && <SpinnerSKCircle />}        
        <DeviceTable devices={devices as DevicesApiResponse[]} />
      </Main>      
    )
}