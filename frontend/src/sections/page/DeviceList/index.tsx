import { lazy, Suspense, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInputsData } from "./useInputData"
import { DeviceTable } from "./DeviceTable"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { defaultCategoryList } from "./defaultCategoryQuery"


const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
const FilterSection = lazy(async () => import('./FilterSection').then(m => ({ default: m.FilterSection })))

const ButtonSection = lazy(async () => import("../../components/buttonsection/ButtonSection").then((m) => ({ default: m.ButtonSection })))
const TypeOfSiteTabNav = lazy(async () => import("../../components/tabs/TypeOfSiteTabNav").then((m) => ({ default: m.TypeOfSiteTabNav })))


export default function DeviceList() {
    const tableRef = useRef<HTMLInputElement>(null)  
    const navigate = useNavigate()
    const { inputData, devices, handleChange, handleClear, loading } = useInputsData()
    const [open, setOpen] = useState<boolean>(false)

    const handleOpenFIlterSidebar = () => {
        setOpen(!open)
    }
  
    const handleAdd = () => {
      navigate("/device/add")
    }
    return (
      <Suspense>
        <Main>
          <Suspense>
            <PageTitle title='Lista de equipos de computación' optionalText={`${devices.length} resultados`} />
          </Suspense>
          
          <Suspense>
            <FilterSection filterCategory={defaultCategoryList} open={open} handleChange={handleChange} handleOpenFIlterSidebar={handleOpenFIlterSidebar} inputData={inputData} />
          </Suspense>
          
          <Suspense>
            <ButtonSection ref={tableRef} handleAdd={handleAdd} handleFilter={handleOpenFIlterSidebar} handleClear={handleClear} />
          </Suspense>
          
          <Suspense fallback={<div className='min-h-7 h-7' />}>
            <TypeOfSiteTabNav onChange={handleChange} value={inputData.typeOfSiteId} />
          </Suspense>
          
          
          {loading && <SpinnerSKCircle />}
          <DeviceTable devices={devices} ref={tableRef as unknown as React.Ref<HTMLTableElement>} />
        </Main>
      </Suspense>
    )
}