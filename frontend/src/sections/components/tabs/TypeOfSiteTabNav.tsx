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
    const [active, setActive] = useState('0')
    const { typeOfSite, loading } = useTypeOfSite()
    const typeOfSiteTab: TypeOfSitePrimitives[] = useMemo(() => {
        return [{ id: '0', name: 'Todos' }].concat(typeOfSite)
    }, [typeOfSite])

    const initialValue = useMemo(() => {
        return value === '' ? '0' : value
    }, [value])
    return (
        <Suspense>
            <TabsNav
            >
                {!loading && typeOfSiteTab.map(type => (
                    <TabNav
                        key={type.id}
                        displayName={type.name}
                        handleClick={() => {
                            if (type.id === initialValue) return
                            setActive(type.id)
                            onChange('typeOfSiteId', type.id === '0' ? '' : type.id, Operator.EQUAL)
                        }}
                        value={type.id}
                        active={active === type.id}
                    />
                ))
                }
            </TabsNav>
        </Suspense>
    )
}