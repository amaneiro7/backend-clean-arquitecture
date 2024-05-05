import { lazy, Suspense } from "react"
import { useAppContext } from "../../Context/AppContext"
import { useLocation } from "../../Device/location/useLocation"
import { LocationApiResponse } from "../../../modules/shared/domain/types/responseTypes"

import { InfoBox } from "../../components/info-box/InfoBox"
import { InfoBoxTitle } from "../../components/info-box/InfoBoxTitle"
import { InfoBoxText } from "../../components/info-box/InfoBoxText"
import { useInputsData } from "./useInputData"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { TypeOfSiteComboBox } from "../../components/combo_box/TypeOfSiteComboBox"


const StateComboBox = lazy(async () => import("../../components/combo_box/StateComboBox").then(m => ({ default: m.StateComboBox })))
const CityComboBox = lazy(async () => import("../../components/combo_box/CityComboBox").then(m => ({ default: m.CityComboBox })))
const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))

export default function ListadoSitios() {
    const { repository } = useAppContext()
    const { locations } = useLocation(repository)
    const { inputData, updateInputData } = useInputsData()
    const handleChange = (name: string, value: string, operator?: Operator) => {
        const filters = [{
          field: name,
          operator: operator ?? Operator.EQUAL,
          value
        }]
        updateInputData({ name, value })        
      }
    return (
        <Suspense>
            <Main>
                <Suspense>
                    <PageTitle title='Listado de Sitios' />
                </Suspense>
                <Suspense>
                    <HeaderInput>
                        <StateComboBox onChange={handleChange} value={inputData.stateId}/>
                        <CityComboBox onChange={handleChange} value={inputData.cityId} state={inputData.stateId}/>
                        <TypeOfSiteComboBox onChange={handleChange} value={inputData.typeOfSiteId} />
                    </HeaderInput>
                </Suspense>
                {
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
            </Main>
        </Suspense>
    )
}
