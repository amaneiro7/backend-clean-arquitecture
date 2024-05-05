import { lazy, Suspense, useCallback } from "react"
import { useAppContext } from "../../Context/AppContext"
import { LocationApiResponse } from "../../../modules/shared/domain/types/responseTypes"

import { InfoBox } from "../../components/info-box/InfoBox"
import { InfoBoxTitle } from "../../components/info-box/InfoBoxTitle"
import { InfoBoxText } from "../../components/info-box/InfoBoxText"
import { useInputsData } from "./useInputData"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { TypeOfSiteComboBox } from "../../components/combo_box/TypeOfSiteComboBox"
import { useLocationByCriteria } from "../../Hooks/locations/useLocationByCriteria"
import { SearchByCriteriaQuery } from "../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import debounce from "just-debounce-it"
import Button from "../../components/button"
import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading"
import { useNavigate } from "react-router-dom"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { LocationNameInput } from "../../components/text-inputs/LocationNameInput"


const StateComboBox = lazy(async () => import("../../components/combo_box/StateComboBox").then(m => ({ default: m.StateComboBox })))
const CityComboBox = lazy(async () => import("../../components/combo_box/CityComboBox").then(m => ({ default: m.CityComboBox })))
const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))

export default function ListadoSitios() {
    const { repository } = useAppContext()
    const navigate = useNavigate()
    const { locations, loading, addFilter, cleanFilters } = useLocationByCriteria(repository)
    const { inputData, updateInputData, clearInputs } = useInputsData()

    const debounceGetLocations = useCallback(
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
        debounceGetLocations({ filters })
    }

    const handleClear = () => {
        clearInputs()
        cleanFilters({
            filters: []
        })
    }
    return (
        <Suspense>
            <Main>
                <Suspense>
                    <PageTitle title='Listado de Sitios' />
                </Suspense>
                <Suspense>
                    <HeaderInput>
                        <LocationNameInput onChange={handleChange} value={inputData.name} />
                        <StateComboBox onChange={handleChange} value={inputData.stateId} />
                        <CityComboBox onChange={handleChange} value={inputData.cityId} state={inputData.stateId} />
                        <TypeOfSiteComboBox onChange={handleChange} value={inputData.typeOfSiteId} />
                        <Suspense fallback={<InputSkeletonLoading />}>
                            <Button
                                type='button'
                                text='Añadir'
                                actionType='ACTION'
                                handle={() => { navigate('/device/add') }}
                            />
                        </Suspense>
                        <Suspense fallback={<InputSkeletonLoading />}>
                            <Button
                                actionType='CLOSE'
                                type='button'
                                text='Limpiar'
                                handle={handleClear}
                            />
                        </Suspense>
                    </HeaderInput>
                </Suspense>
                <section className="grid md:grid-cols-2 place-content-center">
                    {loading && <SpinnerSKCircle />}
                    {(!loading && locations.length === 0) && <p>No hay resultados</p>}
                    {(!loading && locations.length > 0) &&
                        (locations as LocationApiResponse[]).map(({ id, name, subnet, site, typeOfSite }) => (
                            <InfoBox key={id}>
                                <InfoBoxTitle title={name} />
                                <InfoBoxText desc="Tipo" text={typeOfSite.name} />
                                <InfoBoxText desc="Dirección" text={site.address} />
                                <InfoBoxText desc="Estado" text={site.city.state.name} />
                                <InfoBoxText desc="Ciudad" text={site.city.name} />
                                <InfoBoxText desc="Subnet" text={subnet} />
                            </InfoBox>
                        ))
                    }

                </section>
            </Main>
        </Suspense>
    )
}
