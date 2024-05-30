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

export default function DeviceList() {
    const defaultFilter: SearchByCriteriaQuery = useMemo(() => {
        return {
            filters: [
                {
                    field: 'categoryId',
                    operator: Operator.EQUAL,
                    value: '1'
                },
                {
                    field: 'categoryId',
                    operator: Operator.EQUAL,
                    value: '2'
                },
                {
                    field: 'categoryId',
                    operator: Operator.EQUAL,
                    value: '3'
                },
                {
                    field: 'categoryId',

                    operator: Operator.EQUAL,
                    value: '4'
                },
            ]
        }
    }, [])

    const { devices, loading, addFilter, cleanFilters } = useDevice(defaultFilter)
    const navigate = useNavigate()
    const { inputData, updateInputData, clearInputs } = useInputsData()
    const debounceGetDevices = useCallback(
        debounce((query: SearchByCriteriaQuery) => {
            addFilter(query)
        }, 300)
        , [addFilter]
    )

    const handleChange = (name: string, value: string, operator?: Operator) => {
        const filters = [{
            field: name,
            operator: operator ?? Operator.EQUAL,
            value
        }]
        updateInputData({ name, value })
        debounceGetDevices({ filters })
    }

    return (
        <Suspense>
            <Main>
                <Suspense>
                    <PageTitle title="Lista de equipos de computación" />
                </Suspense>
     
                {loading && <SpinnerSKCircle />}
                {(!loading && devices.length === 0) && <p>No hay resultados</p>}
                {(!loading && devices.length > 0) && <Suspense>
                    <DeviceTable devices={devices} onChange={handleChange}/>
                </Suspense>}
            </Main>
        </Suspense>
    )
}