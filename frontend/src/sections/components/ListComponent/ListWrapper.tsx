    import { lazy, Suspense, useRef } from "react"
    import { useNavigate } from "react-router-dom"
    import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
    import { SpinnerSKCircle } from "../Loading/spinner-sk-circle"

    import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"
    import { type FilterContainerRef } from "../FilterContainer/FilterContainer"
    import { type DevicePrimitives } from "../../../modules/devices/devices/devices/domain/Device"
    
    const Main = lazy(async () => import('../Main'))
    const PageTitle = lazy(async () => import('../Typography/PageTitle'))
    const DetailsWrapper = lazy(async () => import("../DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
    const DetailsBoxWrapper = lazy(async () => import("../DetailsWrapper/DetailsBoxWrapper"))
    const FilterSection = lazy(async () => import('./FilterSection').then(m => ({ default: m.FilterSection })))
    const FilterContainer = lazy(async () => import("./FilterContainer/FilterContainer").then(m => ({ default: m.FilterContainer })))
    const DefaultFilterSection = lazy(async () => import('./DefaultFilter').then(m => ({ default: m.DefaultFilterSection })))
    
    const ButtonSection = lazy(async () => import("./buttonsection/ButtonSection").then((m) => ({ default: m.ButtonSection })))
    const TypeOfSiteTabNav = lazy(async () => import("../tabs/TypeOfSiteTabNav").then((m) => ({ default: m.TypeOfSiteTabNav })))    
    

    export function ListWrapper({
        devices, 
        title,
        loading,
        handleChange,
        handleClear,
        inputData,
        otherFilter,
        table
    }: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inputData: any
        title: string
        devices: DevicePrimitives[]
        loading: boolean
        handleChange: (name: string, value: string, operator?: Operator) => void
        handleClear: () => void
        otherFilter?: React.ReactElement,
        table: React.ReactElement
    }) {
        const navigate = useNavigate()
        const filterContainerRef = useRef<FilterContainerRef>(null)
        
        const handleDownload = async () => {
            const clearDataset = await import('../../utils/clearComputerDataset')
            .then(m => m.clearComputerDataset({devices: devices as DevicesApiResponse[]}))
            await import('../../utils/downloadJsonToExcel').then(m => m.jsonToExcel({clearDataset}))      
        }
        
        return (      
          <Main className='pr-8'>      
            <PageTitle title={title} optionalText={!loading && `${devices.length} resultados`} />
            <DetailsWrapper borderColor='blue'>
              <DetailsBoxWrapper>
                <FilterSection handleChange={handleChange} inputData={inputData}>
                  <FilterContainer ref={filterContainerRef}>
                    <DefaultFilterSection 
                      handleChange={handleChange}
                      activo={inputData.activo}
                      statusId={inputData.statusId}
                      brandId={inputData.brandId}
                      modelId={inputData.modelId}
                      categoryId={inputData.categoryId}
                      stateId={inputData.stateId}
                      regionId={inputData.regionId}
                      cityId={inputData.cityId}
                    />                    
                    {otherFilter}
                  </FilterContainer>
                </FilterSection>        
                <ButtonSection handleExportToExcel={handleDownload} handleAdd={() => { navigate("/device/add") }} handleFilter={() => filterContainerRef.current?.handleOpen()} handleClear={handleClear} />      
              </DetailsBoxWrapper>
            
            </DetailsWrapper>
            <Suspense fallback={<div className='min-h-7 h-7' />}>
              <TypeOfSiteTabNav onChange={handleChange} value={inputData.typeOfSiteId} />
            </Suspense>          
            
            {loading && <SpinnerSKCircle />}
            {table}
          </Main>      
        )
    }