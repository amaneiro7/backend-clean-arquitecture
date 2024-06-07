import { lazy, Suspense, useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInputsData } from "./useInputData"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"

const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
const DeviceTable = lazy(async () => import('./DeviceTable').then(m => ({ default: m.DeviceTable })))
const FilterSection = lazy(async () => import('./FilterSection').then(m => ({ default: m.FilterSection })))
const ButtonSection = lazy(async () => import("../../components/buttonsection/ButtonSection").then(m => ({default: m.ButtonSection})))
const TypeOfSiteTabNav = lazy(async () => import("../../components/tabs/TypeOfSiteTabNav").then((m) => ({ default: m.TypeOfSiteTabNav })))

export default function DeviceList() {
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
    return (
      <Suspense>
        <Main>
          <Suspense>
            <PageTitle title='Lista de equipos de computación' optionalText={`${devices.length} resultados`} />
          </Suspense>
          
          <Suspense>
            <FilterSection handleChange={handleChange} handleOpenFIlterSidebar={handleOpenFIlterSidebar} open={open} inputData={inputData} />
          </Suspense>
          
          <Suspense>
            <ButtonSection ref={tableRef} handleAdd={handleAdd} handleFilter={handleOpenFIlterSidebar} handleClear={handleClear} />
          </Suspense>
          
          <Suspense>
            <TypeOfSiteTabNav onChange={handleChange} value={inputData.typeOfSiteId} />
          </Suspense>
          {loading && <SpinnerSKCircle />}
          <Suspense>
            <DeviceTable ref={tableRef} loading={loading} devices={devices} />
          </Suspense>
        </Main>
      </Suspense>
    )
}