import { lazy, Suspense, useCallback, useMemo } from "react";
import debounce from "just-debounce-it";
import { type SearchByCriteriaQuery } from "../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";

import { useDevice } from "../../Hooks/device/useDevice";
import { useNavigate } from "react-router-dom";
import { useInputsData } from "./useInputData";
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle";

const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
const DeviceTable = lazy(async () => import('./DeviceTable').then(m => ({ default: m.DeviceTable })))
const FilterSection = lazy(async () => import('./FilterSection').then(m => ({ default: m.FilterSection })))

export default function DeviceList() {

    
    
    const { inputData, devices, handleChange, loading } = useInputsData()
    

    return (
        <Suspense>
            <Main>
                <Suspense>
                    <PageTitle title="Lista de equipos de computación" />
                </Suspense>
                <Suspense>
                    <FilterSection handleChange={handleChange} inputData={inputData} />
                </Suspense>
                {loading && <SpinnerSKCircle />}
                {(!loading && devices.length === 0) && <p>No hay resultados</p>}
                {<Suspense>
                    <DeviceTable devices={devices} onChange={handleChange}/>
                </Suspense>}
            </Main>
        </Suspense>
    )
}