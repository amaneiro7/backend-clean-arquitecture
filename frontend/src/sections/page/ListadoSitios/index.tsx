import { lazy, Suspense, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import debounce from "just-debounce-it"

import { LocationApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { useInputsData } from "./useInputData"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { useLocationByCriteria } from "../../Hooks/locations/useLocationByCriteria"
import { SearchByCriteriaQuery } from "../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"

import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { MainFallback } from "../../components/skeleton/MainFallback"

const InfoBox = lazy(async () => import("../../components/info-box/InfoBox").then(m => ({ default: m.InfoBox })))
const InfoBoxTitle = lazy(async () => import("../../components/info-box/InfoBoxTitle").then(m => ({ default: m.InfoBoxTitle })))
const InfoBoxText = lazy(async () => import("../../components/info-box/InfoBoxText").then(m => ({ default: m.InfoBoxText })))
const TypeOfSiteComboBox = lazy(async () => import("../../components/combo_box/TypeOfSiteComboBox").then(m => ({ default: m.TypeOfSiteComboBox })))
const LocationNameInput = lazy(async () => import("../../components/text-inputs/location/LocationNameInput").then(m => ({ default: m.LocationNameInput })))
const Button = lazy(async () => import("../../components/button"))
const StateComboBox = lazy(async () => import("../../components/combo_box/location/StateComboBox").then(m => ({ default: m.StateComboBox })))
const CityComboBox = lazy(async () => import("../../components/combo_box/location/CityComboBox").then(m => ({ default: m.CityComboBox })))
const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))

export default function ListadoSitios() {
    const navigate = useNavigate()
    const { locations, loading, addFilter, cleanFilters } = useLocationByCriteria()
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
        <Suspense fallback={<MainFallback />}>
            <Main>
                <Suspense>
                    <PageTitle title='Listado de Sitios' />
                </Suspense>
                <Suspense>
                    <HeaderInput>
                        <LocationNameInput onChange={handleChange} value={inputData.name} />
                        <StateComboBox onChange={handleChange} value={inputData.stateId}  />
                        <CityComboBox onChange={handleChange} value={inputData.cityId} state={inputData.stateId} />
                        <TypeOfSiteComboBox onChange={handleChange} value={inputData.typeOfSiteId} />
                        <Suspense fallback={<InputSkeletonLoading />}>
                            <Button
                                type='button'
                                text='Añadir'
                                actionType='ACTION'
                                handle={() => { navigate('/location/add') }}
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
                        (locations as LocationApiResponse[]).map((location) => (
                            <InfoBox key={location.id}>
                                <InfoBoxTitle title={location.name} state={location} url={`/location/edit/${location.id}`} />
                                <InfoBoxText desc="Tipo" text={location.typeOfSite.name} />
                                <InfoBoxText desc="Dirección" text={location.site.address} />
                                <InfoBoxText desc="Estado" text={location.site.city.state.name} />
                                <InfoBoxText desc="Ciudad" text={location.site.city.name} />
                                <InfoBoxText desc="Subnet" text={location.subnet} />
                            </InfoBox>
                        ))
                    }

                </section>
            </Main>
        </Suspense>
    )
}