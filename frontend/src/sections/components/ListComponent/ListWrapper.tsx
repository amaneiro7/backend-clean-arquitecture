    import React, { lazy, Suspense, useRef } from "react"
    import { useNavigate } from "react-router-dom"
    import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
    import { SpinnerSKCircle } from "../Loading/spinner-sk-circle"
    import { type FilterContainerRef } from "./FilterContainer/FilterContainer"
    import { type TypeOfSiteId } from "../../../modules/location/typeofsites/domain/typeOfSiteId"
    import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
    
    // const Main = lazy(async () => import('../Main'))
    const PageTitle = lazy(async () => import('../Typography/PageTitle'))
    const DetailsWrapper = lazy(async () => import("../DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
    const DetailsBoxWrapper = lazy(async () => import("../DetailsWrapper/DetailsBoxWrapper"))
    const FilterSection = lazy(async () => import('./FilterSection').then(m => ({ default: m.FilterSection })))
    const FilterContainer = lazy(async () => import("./FilterContainer/FilterContainer").then(m => ({ default: m.FilterContainer })))    
    const ButtonSection = lazy(async () => import("./buttonsection/ButtonSection").then((m) => ({ default: m.ButtonSection })))
    const TypeOfSiteTabNav = lazy(async () => import("../tabs/TypeOfSiteTabNav").then((m) => ({ default: m.TypeOfSiteTabNav })))    
    

    export function ListWrapper<Data>({
        data, 
        title,
        loading,
        url,
        handleChange,
        handleClear,
        handleDownload,
        typeOfSiteId,
        mainFilter,
        otherFilter,
        table
    }: {        
        typeOfSiteId?: Primitives<TypeOfSiteId>
        title: string
        url: string
        data: Data[]
        loading: boolean
        handleChange: (name: string, value: string, operator?: Operator) => void
        handleClear: () => void
        handleDownload: () => void
        mainFilter: React.ReactElement
        otherFilter?: React.ReactElement,
        table: React.ReactElement
    }) {
        const navigate = useNavigate()
        const filterContainerRef = useRef<FilterContainerRef>(null)

        const handleFilter = () => { filterContainerRef.current?.handleOpen() }
        
        return (      
          <Suspense>      
            <PageTitle title={title} optionalText={!loading && `${data.length} resultados`} />
            <DetailsWrapper borderColor='blue'>
              <DetailsBoxWrapper>
                <FilterSection>
                  {mainFilter}
                  {otherFilter 
                    ? <FilterContainer ref={filterContainerRef}>{otherFilter}</FilterContainer> 
                    : null}
                </FilterSection>        
                <ButtonSection handleExportToExcel={handleDownload} handleAdd={() => { navigate(url) }} handleFilter={otherFilter ? handleFilter : undefined} handleClear={handleClear} />      
              </DetailsBoxWrapper>
            
            </DetailsWrapper>
            {typeOfSiteId !== undefined ? 
              <Suspense fallback={<div className='min-h-7 h-7' />}>
                <TypeOfSiteTabNav onChange={handleChange} value={typeOfSiteId} />
              </Suspense> 
            : null}
            
            {loading && <SpinnerSKCircle />}
            {table}
          </Suspense>      
        )
    }