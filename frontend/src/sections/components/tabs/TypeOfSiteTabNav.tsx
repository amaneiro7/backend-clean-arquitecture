import { lazy, Suspense, useMemo, useState } from "react"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type TypeOfSitePrimitives } from "../../../modules/location/typeofsites/domain/typeOfSite"
import { useTypeOfSite } from "../../Hooks/locations/useTypeOfSite"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"

interface Props {
    onChange: OnHandleChange
}

const TabsNav = lazy(async () => import('./TabsNav').then(m => ({ default: m.TabsNav })))
const TabNav = lazy(async () => import('./TabNav').then(m => ({ default: m.TabNav })))

export function TypeOfSiteTabNav({ onChange }: Props) {
    const [value, setValue] = useState(0)
    const { typeOfSite, loading } = useTypeOfSite()
    const typeOfSiteTab: TypeOfSitePrimitives[] = useMemo(() => {
        return [{id: '0', name: 'Todos'}].concat(typeOfSite)
    }, [typeOfSite])
    
    return (
        <Suspense>
            <TabsNav
                onChange={(_, nawValue) => {
                    setValue(nawValue)
                    const searchValue = nawValue !== 0 ? nawValue : ''
                    onChange('typeOfSiteId', searchValue, Operator.EQUAL)
                }}
                value={value}
                sx={{ fontSize: '14px' }}
            >
                {!loading && typeOfSiteTab.map(type => (
                        <TabNav
                            key={type.id}
                            label={type.name}
                            aria-label={type.name}
                            title={type.name}
                        />
                    ))
                }
            </TabsNav>
        </Suspense>
    )
}