    import { lazy, Suspense, useRef } from "react"
    import { useNavigate } from "react-router-dom"
    import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
    import { SpinnerSKCircle } from "../Loading/spinner-sk-circle"

    import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"
    import { type FilterContainerRef } from "../FilterContainer/FilterContainer"
    import { type DevicePrimitives } from "../../../modules/devices/devices/devices/domain/Device"
    
    const DetailsWrapper = lazy(async () => import("../DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
    const DetailsBoxWrapper = lazy(async () => import("../DetailsWrapper/DetailsBoxWrapper"))
    const Main = lazy(async () => import('../Main'))
    const FilterContainer = lazy(async () => import("../FilterContainer/FilterContainer").then(m => ({ default: m.FilterContainer })))
    const Input = lazy(async () => import("../text-inputs/Input").then(m => ({ default: m.Input })))
    const PageTitle = lazy(async () => import('../Typography/PageTitle'))
    const FilterSection = lazy(async () => import('./FilterSection').then(m => ({ default: m.FilterSection })))
    const ButtonSection = lazy(async () => import("../buttonsection/ButtonSection").then((m) => ({ default: m.ButtonSection })))
    const TypeOfSiteTabNav = lazy(async () => import("../tabs/TypeOfSiteTabNav").then((m) => ({ default: m.TypeOfSiteTabNav })))
    const StatusComboBox = lazy(() => import('../combo_box/StatusComboBox'))
    const BrandComboBox = lazy(() => import('../combo_box/BrandComboBox'))
    const ModelComboBox = lazy(() => import('../combo_box/ModelComboBox'))
    const CityComboBox = lazy(() => import('../combo_box/location/CityComboBox').then(m => ({ default: m.CityComboBox })))
    const StateComboBox = lazy(() => import('../combo_box/location/StateComboBox').then(m => ({ default: m.StateComboBox })))
    const OperatingSystemComboBox = lazy(() => import('../combo_box/OperatingSystemComboBox').then(m => ({ default: m.OperatingSystemComboBox })))
    const OperatingSystemArqComboBox = lazy(() => import('../combo_box/OperatingSystemArqComboBox').then(m => ({ default: m.OperatingSystemArqComboBox })))

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
                    <Input
                      value={inputData.activo}
                      name='activo'
                      type='text'
                      label='Activo'
                      onChange={(event) => {
                        let { value } = event.target
                        const { name } = event.target
                        value = value.trim().toUpperCase()            
                        handleChange(name, value, Operator.CONTAINS)
                        }}
                    />
                    <StatusComboBox
                      value={inputData.statusId}
                      onChange={handleChange}
                      type='search'
                    />
                    <BrandComboBox
                      value={inputData.brandId}
                      onChange={handleChange}
                      type='search'
                    />
                    <ModelComboBox
                      value={inputData.modelId}
                      brandId={inputData.brandId}
                      categoryId={inputData.categoryId}
                      onChange={handleChange}
                      type='search'
                    />
                    <StateComboBox
                      value={inputData.stateId}
                      region={inputData.regionId}
                      onChange={handleChange}
                      type='search'
                    />
                    <Input
                      value={inputData.computerName}
                      name='computerName'
                      type='text'
                      label='Nombre del equipo'
                      onChange={(event) => {
                    let { value } = event.target
                    const { name } = event.target
                    value = value.trim().toUpperCase()            
                    handleChange(name, value, Operator.CONTAINS)
                  }}
                    />
                    <CityComboBox
                      value={inputData.cityId}
                      state={inputData.stateId}
                      onChange={handleChange}
                      type='search'
                    />
                    <OperatingSystemComboBox
                      value={inputData.operatingSystemId}
                      onChange={handleChange}
                      type='search'
                    />
                    <OperatingSystemArqComboBox
                      value={inputData.operatingSystemArqId}
                      onChange={handleChange}
                      type='search'
                    />
                    <Input
                      value={inputData.processor}
                      name='processor'
                      type='text'
                      label='Procesador'
                      onChange={(event) => {
                    let { value } = event.target
                    const { name } = event.target
                    value = value.trim().toUpperCase()            
                    handleChange(name, value, Operator.CONTAINS)
                  }}
                    />
                    <Input
                      value={inputData.ipAddress}
                      name='ipAddress'
                      type='text'
                      label='Dirección IP'
                      onChange={(event) => {
                    let { value } = event.target
                    const { name } = event.target
                    value = value.trim().toUpperCase()            
                    handleChange(name, value, Operator.CONTAINS)
                    }}
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