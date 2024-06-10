import { lazy, Suspense, useMemo, useState } from "react"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type TypeOfSitePrimitives } from "../../../modules/location/typeofsites/domain/typeOfSite"
import { type TypeOfSiteId } from "../../../modules/location/typeofsites/domain/typeOfSiteId"
import { useTypeOfSite } from "../../Hooks/locations/useTypeOfSite"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"

interface Props {
    onChange: OnHandleChange
    value: Primitives<TypeOfSiteId>
}

const TabsNav = lazy(async () => import('./TabsNav').then(m => ({ default: m.TabsNav })))
const TabNav = lazy(async () => import('./TabNav').then(m => ({ default: m.TabNav })))

export function TypeOfSiteTabNav({ onChange, value }: Props) {
    const [inputValue, setInputValue] = useState(() => value ? value : '0')
    const { typeOfSite, loading } = useTypeOfSite()
    const typeOfSiteTab: TypeOfSitePrimitives[] = useMemo(() => {
        return [{ id: '0', name: 'Todos' }].concat(typeOfSite)
    }, [typeOfSite])
    
    return (
      <Suspense fallback={<div className='min-h-7 h-7' />}>
        <TabsNav>          
          {!loading && typeOfSiteTab.map(type => (
            <Suspense key={type.id} fallback={<div className='p-4 w-20 h-7 will-change-auto rounded-t-md px-4 odd:bg-slate-400 even:bg-slate-300 animate-pulse' />}>
              <TabNav
                displayName={type.name}
                handleClick={() => {
                              if (type.id === inputValue) return
                              setInputValue(type.id)
                              onChange('typeOfSiteId', type.id === '0' ? '' : type.id, Operator.EQUAL)
                          }}
                value={inputValue}
                active={inputValue === type.id}
              />

            </Suspense>
                ))}
        </TabsNav>
      </Suspense>
    )
}