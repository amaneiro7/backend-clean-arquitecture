import { lazy, Suspense, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { type DevicePrimitives } from "../../../modules/devices/devices/devices/domain/Device"
import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { type Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { type InputData } from "./defaultParams"

const Main = lazy(async () => import("../../components/Main"))
const PageTitle = lazy(async () => import("../../components/PageTitle"))
const DeviceTable = lazy(() => import("./DeviceTable").then(m => ({ default: m.DeviceTable })))
const FilterSection = lazy(async () => import("./FilterSection").then((m) => ({ default: m.FilterSection })))
const ButtonSection = lazy(async () => import("../../components/buttonsection/ButtonSection").then((m) => ({ default: m.ButtonSection })))
const TypeOfSiteTabNav = lazy(async () => import("../../components/tabs/TypeOfSiteTabNav").then((m) => ({ default: m.TypeOfSiteTabNav })))

interface Props {
    inputData: InputData
    title: string
    defaultCategory: string[]
    devices: DevicePrimitives[]
    handleChange: (name: string, value: string, operator?: Operator) => void
    handleClear: () => void
    loading: boolean
}

export function ListPage({ devices, defaultCategory, title, handleChange, handleClear, inputData, loading }: Props) {
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)

    const handleOpenFIlterSidebar = () => {
      setOpen(!open)
    }

    const handleDownload = async () => {
      const clearDataset = await import('../../utils/clearDefaultDataset')
        .then(m => m.clearDefaultDataset({devices: devices as DevicesApiResponse[]}))
      await import('../../utils/downloadJsonToExcel').then(m => m.jsonToExcel({clearDataset}))      
    }

    const handleAdd = () => {
      navigate("/device/add")
    }

    return (
      <Main>
        <PageTitle title={title} optionalText={`${devices.length} resultados`} />

        <FilterSection filterCategory={defaultCategory} handleChange={handleChange} handleOpenFIlterSidebar={handleOpenFIlterSidebar} open={open} inputData={inputData} />

        <ButtonSection handleExportToExcel={handleDownload} handleAdd={handleAdd} handleFilter={handleOpenFIlterSidebar} handleClear={handleClear} />

        <Suspense fallback={<div className='min-h-7 h-7' />}>
          <TypeOfSiteTabNav onChange={handleChange} value={inputData.typeOfSiteId} />
        </Suspense>


        {loading && <SpinnerSKCircle />}
        <DeviceTable devices={devices as DevicesApiResponse[]} />

      </Main>

    )
}
