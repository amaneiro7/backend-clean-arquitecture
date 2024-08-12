import { lazy, Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { type LocationApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useInputsData } from "../../components/ListComponent/useInputData"
import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { useLocationContext } from "../../Context/LocationProvider"

const DetailsWrapper = lazy(async () => import("../../components/DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper})))
const DetailsBoxWrapper = lazy(async () => import("../../components/DetailsWrapper/DetailsBoxWrapper"))
const InfoBox = lazy(async () => import("../../components/info-box/InfoBox").then(m => ({ default: m.InfoBox })))
const InfoBoxTitle = lazy(async () => import("../../components/info-box/InfoBoxTitle").then(m => ({ default: m.InfoBoxTitle })))
const InfoBoxText = lazy(async () => import("../../components/info-box/InfoBoxText").then(m => ({ default: m.InfoBoxText })))
const TypeOfSiteComboBox = lazy(async () => import("../../components/combo_box/TypeOfSiteComboBox").then(m => ({ default: m.TypeOfSiteComboBox })))
const LocationNameInput = lazy(async () => import("../../components/text-inputs/location/LocationNameInput").then(m => ({ default: m.LocationNameInput })))
const Button = lazy(async () => import("../../components/button/button"))
const StateComboBox = lazy(async () => import("../../components/combo_box/location/StateComboBox").then(m => ({ default: m.StateComboBox })))
const RegionComboBox = lazy(async () => import("../../components/combo_box/location/RegionComboBox").then(m => ({ default: m.RegionComboBox })))
const CityComboBox = lazy(async () => import("../../components/combo_box/location/CityComboBox").then(m => ({ default: m.CityComboBox })))
const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/Typography/PageTitle'))
const AddIcon = lazy(() => import("../../components/icon/AddIcon").then((m) => ({ default: m.AddIcon })))

export default function ListadoSitios() {
    const navigate = useNavigate()
    const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
    const { locations, loading, addFilter, cleanFilters } = useLocationContext()
    const { handleChange, handleClear, inputData } = useInputsData({ addFilter, cleanFilters, initialInputData, defaultInputData })
    
        return (      
          <Main content='max' overflow={false} className='pr-8'>
            <PageTitle title='Listado de Sitios' />
            <DetailsWrapper borderColor='blue'>
              <DetailsBoxWrapper>
                <HeaderInput>
                  <LocationNameInput type='search' onChange={handleChange} value={inputData.name} />
                  <RegionComboBox onChange={handleChange} value={inputData.regionId}  />
                  <StateComboBox onChange={handleChange} value={inputData.stateId} region={inputData.regionId} />
                  <CityComboBox onChange={handleChange} value={inputData.cityId} state={inputData.stateId} region={inputData.regionId} />
                  <TypeOfSiteComboBox onChange={handleChange} value={inputData.typeOfSiteId} />
                </HeaderInput>
                <section className='my-4 min-h-11 flex gap-2'>
                  <Suspense fallback={<InputSkeletonLoading />}>
                    <Button
                      type='button'
                      text='Añadir'
                      color='orange'                
                      buttonSize='medium'
                      size='content'
                      onClick={() => { navigate('/location/add') }}
                      icon={
                        <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                          <AddIcon width={20} fill='white' className='aspect-square' />
                        </Suspense>
          }
                    />              
                  </Suspense>
                  <Suspense fallback={<InputSkeletonLoading />}>
                    <Button
                      color='secondary'
                      buttonSize='medium'
                      size='content'
                      type='button'
                      text='Limpiar'
                      onClick={handleClear}
                    />
                  </Suspense>
                </section>
              </DetailsBoxWrapper>
              <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))',
            gap: '2rem',
          }}
              >
                {loading && <SpinnerSKCircle />}
                {(!loading && locations.length === 0) && <p>No hay resultados</p>}
                {(!loading && locations.length > 0) &&
                        (locations as LocationApiResponse[]).map((location) => (
                          <InfoBox key={location?.id}>
                            <InfoBoxTitle title={location?.name} state={location} url={`/location/edit/${location?.id}`} />
                            <InfoBoxText desc='Tipo' text={location?.typeOfSite?.name} />
                            <InfoBoxText className='flex-1' desc='Dirección' text={location?.site?.address} />
                            <InfoBoxText desc='Estado' text={location?.site?.city?.state?.name} />
                            <InfoBoxText desc='Ciudad' text={location?.site?.city?.name} />
                            <InfoBoxText desc='Subnet' text={location?.subnet} />
                          </InfoBox>
                        ))}
              </section>
            </DetailsWrapper>
          
          </Main> 
        )
}