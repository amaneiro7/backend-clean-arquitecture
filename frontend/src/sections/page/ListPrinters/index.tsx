import { lazy, Suspense } from "react";
import { useInputsData } from "./useInputData";
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle";

const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
const DeviceTable = lazy(async () => import('./DeviceTable').then(m => ({ default: m.DeviceTable })))
const FilterSection = lazy(async () => import('./FilterSection').then(m => ({ default: m.FilterSection })))

export default function ListPrinter() {

    const { inputData, devices, handleChange, handleClear, loading } = useInputsData()

    return (
        <Suspense>
            <Main>
                <Suspense>
                    <PageTitle title="Lista de impresoras" />
                </Suspense>
                <Suspense>
                    <FilterSection handleChange={handleChange} handleClear={handleClear} inputData={inputData} />
                </Suspense>
                {loading && <SpinnerSKCircle />}
                {(!loading && devices.length === 0) && <p>No hay resultados que coincidan con el filtro</p>}
                {<Suspense>
                    <DeviceTable devices={devices} onChange={handleChange} inputData={inputData} />
                </Suspense>}
            </Main>
        </Suspense>
    )
}